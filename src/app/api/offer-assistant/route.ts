import { NextResponse } from 'next/server';
import { getClientIP } from '@/lib/antispam';
import { publishedPrices, seoLandings, services } from '@/lib/site-services';
import {
    buildMessagesRequest, createRateLimiter, extractToolInput, normalizeAnswer, validateQuestion,
    type Catalogue,
} from '@/lib/offer-assistant';

const catalogue: Catalogue = { services, landings: seoLandings, prices: publishedPrices };
const DEFAULT_MODEL = 'claude-haiku-5-5';
const TIMEOUT_MS = 20_000;
const limit = createRateLimiter(8, 10 * 60 * 1000);

const fail = (status: number, error: string, headers?: HeadersInit) =>
    NextResponse.json({ ok: false, error }, { status, headers });

/** POST { question, website? } → { ok: true, answer: OfferAnswer } */
export async function POST(request: Request) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return fail(503, 'Asystent jest chwilowo niedostępny. Napisz do nas — odpowiemy osobiście.');

    let body: Record<string, unknown>;
    try {
        body = await request.json();
    } catch {
        return fail(400, 'Nieprawidłowe zapytanie.');
    }

    // Honeypot: bots fill every field; answer like a validation error so they learn nothing.
    if (typeof body.website === 'string' && body.website.trim()) return fail(400, 'Nieprawidłowe zapytanie.');

    const check = validateQuestion(body.question);
    if (!check.ok) return fail(400, check.error);

    const rate = limit(getClientIP(request));
    if (!rate.allowed) {
        return fail(429, 'Dużo pytań w krótkim czasie — spróbuj za kilka minut albo napisz do nas.', { 'Retry-After': String(rate.retryAfterSeconds) });
    }

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
            return fail(502, 'Asystent nie odpowiedział. Spróbuj ponownie albo napisz do nas.');
        }
        const answer = normalizeAnswer(extractToolInput(await res.json()), catalogue);
        if (!answer) return fail(502, 'Asystent nie odpowiedział. Spróbuj ponownie albo napisz do nas.');
        return NextResponse.json({ ok: true, answer }, { headers: { 'Cache-Control': 'no-store' } });
    } catch (error) {
        console.error('offer-assistant: request failed', error instanceof Error ? error.name : 'unknown');
        return fail(504, 'Asystent odpowiada zbyt długo. Spróbuj ponownie albo napisz do nas.');
    }
}
