import { NextResponse } from 'next/server';
import { getClientIP } from '@/lib/antispam';
import { publishedPrices, seoLandings, services } from '@/lib/site-services';
import {
    answerFromCatalogue, buildMessagesRequest, extractToolInput, normalizeAnswer, validateQuestion,
    type Catalogue, type OfferAnswer,
} from '@/lib/offer-assistant';
import { checkQuota, limitsFromEnv, recordAiAnswer } from '@/lib/assistant-quota';
import { quotaStore, visitorId } from '@/lib/assistant-quota-store';

const catalogue: Catalogue = { services, landings: seoLandings, prices: publishedPrices };
const DEFAULT_MODEL = 'claude-haiku-5-5';
// Below Netlify's 10 s synchronous function limit, so a slow answer still ends in a readable reply.
const CLAUDE_TIMEOUT_MS = 8_000;
const QUOTA_TIMEOUT_MS = 500;

const ok = (answer: OfferAnswer, headers?: HeadersInit) =>
    NextResponse.json({ ok: true, answer }, { headers: { 'Cache-Control': 'no-store', ...headers } });
const fail = (status: number, error: string, headers?: HeadersInit) =>
    NextResponse.json({ ok: false, error }, { status, headers });

/** POST { question, website? } → { ok: true, answer: OfferAnswer } */
export async function POST(request: Request) {
    let body: Record<string, unknown>;
    try {
        body = await request.json();
    } catch {
        return fail(400, 'Nieprawidłowe zapytanie.');
    }
    if (!body || typeof body !== 'object' || Array.isArray(body)) return fail(400, 'Nieprawidłowe zapytanie.');

    // Honeypot: bots fill every field; answer like a validation error so they learn nothing.
    if (typeof body.website === 'string' && body.website.trim()) return fail(400, 'Nieprawidłowe zapytanie.');

    const check = validateQuestion(body.question);
    if (!check.ok) return fail(400, check.error);

    const timing = new ServerTiming();

    // Floods get a 429; anyone over the AI limits (per visitor or site-wide per day) gets the free catalogue answer.
    const store = quotaStore();
    const quota = await timing.measure('quota', withTimeout(
        checkQuota(store, visitorId(getClientIP(request)), limitsFromEnv(process.env)),
        QUOTA_TIMEOUT_MS,
    ));
    if (quota?.decision === 'block') {
        return fail(429, 'Dużo pytań w krótkim czasie — spróbuj za jakiś czas albo napisz do nas.', { 'Retry-After': '3600' });
    }

    const catalogueAnswer = (reason: string) => ok(answerFromCatalogue(check.question, catalogue), timing.note(reason));

    // Without a key (local dev, misconfigured env) the visitor still gets a catalogue-based answer.
    const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
    if (!apiKey) return catalogueAnswer('no-key');
    if (quota?.decision === 'catalogue') return catalogueAnswer('quota');

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), CLAUDE_TIMEOUT_MS);
    try {
        const res = await timing.measure('claude', fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
            },
            body: JSON.stringify(buildMessagesRequest(check.question, catalogue, process.env.ANTHROPIC_MODEL?.trim() || DEFAULT_MODEL)),
            signal: controller.signal,
            cache: 'no-store',
        }));
        if (!res.ok) {
            console.error('offer-assistant: upstream error', res.status, (await res.text()).slice(0, 300));
            return catalogueAnswer(`upstream-${res.status}`);
        }
        const answer = normalizeAnswer(extractToolInput(await res.json()), catalogue);
        if (!answer) return catalogueAnswer('unusable');
        if (quota) await withTimeout(recordAiAnswer(store, quota.keys), QUOTA_TIMEOUT_MS);
        return ok(answer, timing.note('ai'));
    } catch (error) {
        // Timeout or network failure: answer from the catalogue rather than leave the visitor with an error.
        const reason = controller.signal.aborted ? 'timeout' : 'network';
        console.error('offer-assistant: request failed', reason, error instanceof Error ? error.message : 'unknown');
        return catalogueAnswer(reason);
    } finally {
        clearTimeout(timer);
    }
}

/** Resolves to null instead of hanging when a dependency (e.g. Netlify Blobs) does not answer in time. */
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | null> {
    return Promise.race([
        promise.catch(() => null),
        new Promise<null>((resolve) => setTimeout(() => resolve(null), ms)),
    ]);
}

/** `Server-Timing` header: stage durations and why an answer came from the catalogue — no secrets. */
class ServerTiming {
    private entries: string[] = [];
    async measure<T>(name: string, promise: Promise<T>): Promise<T> {
        const t0 = Date.now();
        try {
            return await promise;
        } finally {
            this.entries.push(`${name};dur=${Date.now() - t0}`);
        }
    }
    note(source: string): HeadersInit {
        return { 'Server-Timing': [...this.entries, `source;desc="${source}"`].join(', ') };
    }
}
