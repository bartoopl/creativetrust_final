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
// Below Netlify's 10 s synchronous function limit, so a slow answer still ends in a readable error.
const TIMEOUT_MS = 9_000;

const ok = (answer: OfferAnswer) => NextResponse.json({ ok: true, answer }, { headers: { 'Cache-Control': 'no-store' } });
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

    // Floods get a 429; anyone over the AI limits (per visitor or site-wide per day) gets the free catalogue answer.
    const store = quotaStore();
    const { decision, keys } = await checkQuota(store, visitorId(getClientIP(request)), limitsFromEnv(process.env));
    if (decision === 'block') {
        return fail(429, 'Dużo pytań w krótkim czasie — spróbuj za jakiś czas albo napisz do nas.', { 'Retry-After': '3600' });
    }

    // Without a key (local dev, misconfigured env) the visitor still gets a catalogue-based answer.
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey || decision === 'catalogue') return ok(answerFromCatalogue(check.question, catalogue));

    try {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
            },
            body: JSON.stringify(buildMessagesRequest(check.question, catalogue, process.env.ANTHROPIC_MODEL || DEFAULT_MODEL)),
            signal: AbortSignal.timeout(TIMEOUT_MS),
        });
        if (!res.ok) {
            console.error('offer-assistant: upstream error', res.status);
            return ok(answerFromCatalogue(check.question, catalogue));
        }
        const answer = normalizeAnswer(extractToolInput(await res.json()), catalogue);
        if (!answer) return ok(answerFromCatalogue(check.question, catalogue));
        await recordAiAnswer(store, keys);
        return ok(answer);
    } catch (error) {
        // Timeout or network failure: answer from the catalogue rather than leave the visitor with an error.
        console.error('offer-assistant: request failed', error instanceof Error ? error.name : 'unknown');
        return ok(answerFromCatalogue(check.question, catalogue));
    }
}
