#!/usr/bin/env node
/**
 * Post-deploy check for the retired URLs in RETIRED_PATHS.
 *
 * For every pair it requests the source and the source with a trailing slash,
 * follows the redirect chain and asserts that the chain ends on the mapped
 * target with 200. Old WordPress addresses must answer with 301; retired
 * service pages use `permanent: true`, which Next.js emits as 308, so those
 * accept either permanent code. The site normalises a trailing slash with a
 * 308 before `redirects()` runs, hence the chain check instead of a single-hop
 * check on that variant.
 *
 * Usage: node scripts/check-redirects.mjs
 *        BASE_URL=http://localhost:3000 node scripts/check-redirects.mjs
 * No tokens needed. Exits 1 on the first summary with any failed pair.
 */
import { RETIRED_CONTENT_PAGES, RETIRED_PATHS } from '../src/lib/retired-links.ts';

const BASE_URL = (process.env.BASE_URL ?? 'https://www.creativetrust.pl').replace(/\/+$/, '');
const MAX_HOPS = 5;
const TIMEOUT_MS = 20_000;

const absolute = (path) => new URL(path, `${BASE_URL}/`);

async function hop(url) {
    const res = await fetch(url, {
        redirect: 'manual',
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: { 'user-agent': 'creativetrust-redirect-check/1.0' },
    });
    await res.body?.cancel();
    return {
        status: res.status,
        location: res.headers.get('location'),
        url: res.url || url,
    };
}

/** Follows redirects and returns every status plus the final URL. */
async function trace(path) {
    const chain = [];
    let url = absolute(path).toString();

    for (let i = 0; i <= MAX_HOPS; i += 1) {
        const res = await hop(url);
        chain.push(res.status);
        if (res.status >= 300 && res.status < 400 && res.location) {
            url = new URL(res.location, url).toString();
            continue;
        }
        return { chain, finalUrl: url, finalPath: new URL(url).pathname, finalStatus: res.status };
    }

    return { chain, finalUrl: url, finalPath: new URL(url).pathname, finalStatus: chain.at(-1), tooManyHops: true };
}

function check(variant, traceResult, expectedTarget, requires301) {
    const permanent = requires301 ? [301] : [301, 308];
    const problems = [];
    if (traceResult.tooManyHops) problems.push(`more than ${MAX_HOPS} redirects`);
    if (traceResult.finalStatus !== 200) problems.push(`final status ${traceResult.finalStatus}`);
    if (traceResult.finalPath !== expectedTarget) problems.push(`ended at ${traceResult.finalPath}, expected ${expectedTarget}`);
    if (!traceResult.chain.some((status) => permanent.includes(status))) {
        problems.push(`no ${permanent.join('/')} in the chain`);
    }
    if (variant === '' && !permanent.includes(traceResult.chain[0])) {
        problems.push(`first hop ${traceResult.chain[0]}, expected ${permanent.join(' or ')}`);
    }
    if (traceResult.chain.slice(0, -1).some((status) => status !== 301 && status !== 308)) {
        problems.push(`unexpected redirect status in ${traceResult.chain.join(' → ')}`);
    }
    return problems;
}

const rows = [];
for (const [source, target] of Object.entries(RETIRED_PATHS)) {
    for (const variant of ['', '/']) {
        const path = `${source}${variant}`;
        let problems;
        let traceResult;
        try {
            traceResult = await trace(path);
            problems = check(variant, traceResult, target, source in RETIRED_CONTENT_PAGES);
        } catch (error) {
            traceResult = { chain: ['ERR'], finalPath: '—', finalStatus: '—' };
            problems = [error instanceof Error ? error.message : String(error)];
        }
        rows.push({
            source: path,
            chain: traceResult.chain.join(' → '),
            target: problems.length ? traceResult.finalPath : target,
            ok: problems.length === 0,
            problems,
        });
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
