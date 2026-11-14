import type { NextConfig } from 'next';
import { withPayload } from '@payloadcms/next/withPayload';
// Blog posts replaced by a current page (301 here, left out of llms.txt and the
// sitemap): AI answers quote outdated 2023 prices and trends.
import retiredBlogPosts from './retired-blog-posts.json';
import { RETIRED_CONTENT_PAGES, RETIRED_SERVICE_PAGES } from './src/lib/retired-links';
import { CANONICAL_ORIGIN } from './src/lib/canonical-redirects';

/**
 * A redirect rule only rewrites the path it matched, so a relative destination
 * would drop the visitor on whatever host asked. Absolute destinations make one
 * rule finish the job even on the bare domain.
 */
const absolute = (destination: string) => `${CANONICAL_ORIGIN}${destination}`;

const nextConfig: NextConfig = {
    poweredByHeader: false,
    // Self-contained server for the Docker image (Dockerfile).
    output: 'standalone',
    // The proxy strips a trailing slash with a 301 (GSC counts a 308 as a separate
    // redirect and reports chains). Next's own 308 would run before the proxy, so
    // it is turned off; `/admin` and `/api` keep an explicit rule below.
    skipTrailingSlashRedirect: true,
    images: {
        // CMS uploads are served by Payload under /api/media/file (absolute URLs on the site).
        remotePatterns: [{ protocol: 'https', hostname: 'www.creativetrust.pl', pathname: '/api/media/file/**' }],
    },
    productionBrowserSourceMaps: false,
    // Two root layouts ((pl) and en): unmatched URLs render src/app/global-not-found.tsx.
    experimental: { globalNotFound: true },
    async redirects() {
        // The bare domain, the trailing slash and legacy aliases are settled by the
        // proxy in one 301 (src/lib/canonical-redirects.ts): rules here run first
        // and would each add a hop to the chain.
        return [
            // Retired service pages → the closest live page (the same map rewrites post bodies).
            ...Object.entries(RETIRED_SERVICE_PAGES).map(([source, destination]) => ({ source, destination: absolute(destination), permanent: true })),
            // Old WordPress addresses: one 301 for each, with and without the trailing
            // slash, since old Google results and external links use both.
            ...Object.entries(RETIRED_CONTENT_PAGES).flatMap(([source, destination]) => [
                { source, destination: absolute(destination), statusCode: 301 },
                { source: `${source}/`, destination: absolute(destination), statusCode: 301 },
            ]),
            // „Konsulting e-commerce” became the e-commerce audit (HTML and Markdown twin).
            {
                source: '/uslugi/konsulting-e-commerce',
                destination: absolute('/uslugi/audyt-e-commerce'),
                permanent: true,
            },
            {
                source: '/uslugi/konsulting-e-commerce.md',
                destination: absolute('/uslugi/audyt-e-commerce.md'),
                permanent: true,
            },
            // The English consulting page became the e-commerce audit.
            {
                source: '/en/services/e-commerce-consulting',
                destination: absolute('/en/services/e-commerce-audit'),
                permanent: true,
            },
            // Managed as a redirect document in Sanity until the move to Payload.
            {
                source: '/psychologia-kolorow-w-ui-ux-jakie-znaczenie-maja-kolory-na-stronie-internetowej',
                destination: absolute('/blog/psychologia-kolorow-w-ui-ux-jakie-znaczenie-maja-kolory-na-stronie-internetowej'),
                permanent: true,
            },
            // Retired posts (outdated 2023 prices, duplicates consolidated into a longer
            // post) → the current page, HTML and Markdown twin. 301, not 308: search
            // engines must transfer the history, and the permanent flag emits 308.
            ...Object.entries(retiredBlogPosts as Record<string, string>).flatMap(([slug, destination]) => [
                { source: `/blog/${slug}`, destination: absolute(destination), statusCode: 301 },
                { source: `/blog/${slug}.md`, destination: absolute(`${destination}.md`), statusCode: 301 },
            ]),
            // The proxy handles the slash of pages; the admin panel and the API are
            // outside its matcher, and an API redirect keeps its method with 308.
            { source: '/admin/', destination: '/admin', statusCode: 301 },
            { source: '/admin/:path*/', destination: '/admin/:path*', statusCode: 301 },
            { source: '/api/:path*/', destination: '/api/:path*', statusCode: 308 },
        ];
    },
    async headers() {
        return [
            // Cloudflare caches what s-maxage allows (/_next/static is immutable by default).
            // Uploaded files keep their name until replaced; a day in browsers, a month at the edge.
            {
                source: '/api/media/file/:path*',
                headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, s-maxage=2592000, stale-while-revalidate=86400' }],
            },
            {
                source: '/(.*)',
                headers: [
                    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
                    { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
                ],
            },
        ];
    },
}

export default withPayload(nextConfig, { devBundleServerPackages: false });