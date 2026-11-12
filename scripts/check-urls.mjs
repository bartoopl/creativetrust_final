#!/usr/bin/env node
/**
 * URL parity check for the move off Sanity/Netlify: every URL the live site
 * answers must answer the same way on the candidate (same status, same
 * redirect target), and the candidate's sitemap must list the same pages.
 *
 *   node scripts/check-urls.mjs --candidate http://localhost:3100
 *   node scripts/check-urls.mjs --baseline https://www.creativetrust.pl --candidate https://staging.example
 *
 * URLs checked: everything in the baseline sitemap, the Markdown twin of every
 * page and article, retired blog posts (301s), llms.txt and the sitemap itself.
 * Exits 1 on any difference.
 */
import { readFileSync } from 'node:fs';

const args = Object.fromEntries(
    process.argv.slice(2).reduce((pairs, arg, index, all) => (arg.startsWith('--') ? [...pairs, [arg.slice(2), all[index + 1]]] : pairs), []),
);
const baseline = (args.baseline ?? 'https://www.creativetrust.pl').replace(/\/$/, '');
const candidate = args.candidate?.replace(/\/$/, '');
if (!candidate) {
    console.error('Usage: node scripts/check-urls.mjs --candidate <origin> [--baseline <origin>]');
    process.exit(2);
}
const SITE = 'https://www.creativetrust.pl';
// Not pages: next-sitemap used to list icons and the manifest; the new sitemap does not.
const NOT_PAGES = /\.(png|svg|ico|webmanifest)$/;

async function sitemapPaths(origin) {
    const xml = await (await fetch(`${origin}/sitemap-0.xml`)).text();
    return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, '') || '/');
}

const retired = JSON.parse(readFileSync(new URL('../retired-blog-posts.json', import.meta.url), 'utf8'));

const live = await sitemapPaths(baseline);
const pages = live.filter((path) => !NOT_PAGES.test(path));
const twins = pages
    .filter((path) => /^\/(blog|portfolio|baza-wiedzy)\/[^/]+$/.test(path) || ['/portfolio', '/blog', '/uslugi', '/o-nas', '/kontakt'].includes(path))
    .filter((path) => !path.startsWith('/blog/kategoria'))
    .map((path) => `${path}.md`);
const paths = [...new Set([...pages, ...twins, ...Object.keys(retired).map((slug) => `/blog/${slug}`), '/llms.txt', '/llms-full.txt', '/sitemap.xml', '/robots.txt'])];

async function probe(origin, path) {
    for (let attempt = 0; ; attempt += 1) {
        try {
            const response = await fetch(`${origin}${path}`, { redirect: 'manual', headers: { 'User-Agent': 'creativetrust-url-check' } });
            const location = response.headers.get('location');
            await response.arrayBuffer();
            return { status: response.status, location: location ? new URL(location, `${SITE}${path}`).pathname : null };
        } catch (error) {
            if (attempt === 2) return { status: `error: ${error.message}`, location: null };
        }
    }
}

async function inBatches(items, size, work) {
    const out = [];
    for (let i = 0; i < items.length; i += size) out.push(...(await Promise.all(items.slice(i, i + size).map(work))));
    return out;
}

console.log(`Checking ${paths.length} URLs: ${baseline} vs ${candidate}`);
const results = await inBatches(paths, 8, async (path) => ({ path, before: await probe(baseline, path), after: await probe(candidate, path) }));

// 301/308 are both permanent; a 200 that stays a 200 is what matters.
const kind = (status) => (status === 301 || status === 308 ? 'permanent' : status);
const problems = results.filter(({ before, after }) => kind(before.status) !== kind(after.status) || before.location !== after.location);

const candidateSitemap = new Set(await sitemapPaths(candidate));
const missing = pages.filter((path) => !candidateSitemap.has(path) && results.find((r) => r.path === path)?.before.status === 200);
const extra = [...candidateSitemap].filter((path) => !live.includes(path));

for (const { path, before, after } of problems) {
    console.log(`✗ ${path}: ${before.status}${before.location ? ` → ${before.location}` : ''}  ≠  ${after.status}${after.location ? ` → ${after.location}` : ''}`);
}
for (const path of missing) console.log(`✗ sitemap: ${path} is listed live but not on the candidate`);
for (const path of extra) console.log(`+ sitemap: ${path} is new on the candidate`);

const ok = results.length - problems.length;
console.log(`\n${ok}/${results.length} URLs answer the same; sitemap: ${missing.length} missing, ${extra.length} new.`);
process.exit(problems.length || missing.length ? 1 : 0);
