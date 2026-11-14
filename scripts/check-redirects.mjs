#!/usr/bin/env node
/**
 * Post-deploy check for every redirect the site owns.
 *
 * GSC (2026-11-14) reported chains and 404s, so this script now demands the
 * opposite of a chain: for each source it tries four variants (canonical host
 * and bare domain, with and without the trailing slash) and expects **exactly
 * one** redirect, a 301, straight to the mapped target, then 200.
 *
 * Usage: node scripts/check-redirects.mjs
 *        BASE_URL=http://localhost:3000 node scripts/check-redirects.mjs
 * No tokens needed. Exits 1 on the first summary with any failed pair.
 */
import { LEGACY_REDIRECTS } from '../src/lib/canonical-redirects.ts';
import { RETIRED_PATHS } from '../src/lib/retired-links.ts';

const BASE_URL = (process.env.BASE_URL ?? 'https://www.creativetrust.pl').replace(/\/+$/, '');
const APEX_URL = BASE_URL.replace('://www.', '://');
const MAX_HOPS = 5;
const TIMEOUT_MS = 20_000;

const absolute = (base, path) => new URL(path, `${base}/`);

async function hop(url) {
    const res = await fetch(url, {
        redirect: 'manual',
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: { 'user-agent': 'creativetrust-redirect-check/1.0' },
    });
    await res.body?.cancel();
    return { status: res.status, location: res.headers.get('location'), url: res.url || url };
}

/** Follows redirects and returns every status plus the final URL. */
async function trace(path) {
    const chain = [];
    let url = path.toString();

    for (let i = 0; i <= MAX_HOPS; i += 1) {
        const res = await hop(url);
        chain.push(res.status);
        if (res.status >= 300 && res.status < 400 && res.location) {
            url = new URL(res.location, url).toString();
            continue;
        }
        return { chain, finalUrl: url, finalPath: new URL(url).pathname, finalStatus: res.status };
    }

    return { chain, finalPath: new URL(url).pathname, finalStatus: chain.at(-1), tooManyHops: true };
}

/** Exactly one 301, and it lands on the expected path. */
function check(traceResult, expectedTarget) {
    const problems = [];
    const redirects = traceResult.chain.filter((status) => status >= 300 && status < 400);
    if (traceResult.tooManyHops) problems.push(`more than ${MAX_HOPS} redirects`);
    if (traceResult.finalStatus !== 200) problems.push(`final status ${traceResult.finalStatus}`);
    if (traceResult.finalPath !== expectedTarget) problems.push(`ended at ${traceResult.finalPath}, expected ${expectedTarget}`);
    if (redirects.length !== 1) problems.push(`${redirects.length} redirects (${traceResult.chain.join(' → ')}), expected 1`);
    if (redirects[0] !== 301) problems.push(`first hop ${redirects[0]}, expected 301`);
    return problems;
}

const rows = [];
for (const [source, target] of Object.entries({ ...RETIRED_PATHS, ...LEGACY_REDIRECTS })) {
    for (const base of [BASE_URL, APEX_URL]) {
        for (const variant of ['', '/']) {
            const path = absolute(base, `${source}${variant}`);
            const host = new URL(base).host;
            const shown = `//${host}${source}${variant}`;
            let problems;
            let traceResult;
            try {
                traceResult = await trace(path);
                problems = check(traceResult, target);
            } catch (error) {
                traceResult = { chain: ['ERR'], finalPath: '—', finalStatus: '—' };
                problems = [error instanceof Error ? error.message : String(error)];
            }
            rows.push({
                source: shown,
                chain: traceResult.chain.join(' → '),
                target: problems.length ? traceResult.finalPath : target,
                ok: problems.length === 0,
                problems,
            });
        }
    }
}

const width = Math.max(...rows.map((row) => row.source.length), 'Source'.length);
console.log(`Checking ${rows.length} URLs against ${BASE_URL}\n`);
console.log(`${'Source'.padEnd(width)}  ${'Chain'.padEnd(14)}  Target / result`);
console.log(`${'-'.repeat(width)}  ${'-'.repeat(14)}  ${'-'.repeat(40)}`);
for (const row of rows) {
    const result = row.ok ? `OK → ${row.target}` : `FAIL → ${row.target} (${row.problems.join('; ')})`;
    console.log(`${row.source.padEnd(width)}  ${row.chain.padEnd(14)}  ${result}`);
}

const failed = rows.filter((row) => !row.ok);
console.log(`\n${rows.length - failed.length}/${rows.length} passed, ${failed.length} failed`);
process.exit(failed.length ? 1 : 0);
