import type { NextConfig } from 'next';
import { withPayload } from '@payloadcms/next/withPayload';
// Blog posts replaced by a current page (301 here, left out of llms.txt and the
// sitemap): AI answers quote outdated 2023 prices and trends.
import retiredBlogPosts from './retired-blog-posts.json';
import { RETIRED_SERVICE_PAGES } from './src/lib/retired-links';
import { apexRedirect } from './src/lib/host-redirects';

const nextConfig: NextConfig = {
    poweredByHeader: false,
    // Self-contained server for the Docker image (Dockerfile).
    output: 'standalone',
    images: {
        // CMS uploads are served by Payload under /api/media/file (absolute URLs on the site).
        remotePatterns: [{ protocol: 'https', hostname: 'www.creativetrust.pl', pathname: '/api/media/file/**' }],
    },
    productionBrowserSourceMaps: false,
    // Two root layouts ((pl) and en): unmatched URLs render src/app/global-not-found.tsx.
    experimental: { globalNotFound: true },
    async redirects() {
        return [
            // Bare domain → https://www in one 301 (WEW-17).
            apexRedirect,
            // Retired service pages → the closest live page (the same map rewrites post bodies).
            ...Object.entries(RETIRED_SERVICE_PAGES).map(([source, destination]) => ({ source, destination, permanent: true })),
            // „Konsulting e-commerce” became the e-commerce audit (HTML and Markdown twin).
            {
                source: '/uslugi/konsulting-e-commerce',
                destination: '/uslugi/audyt-e-commerce',
                permanent: true,
            },
            {
                source: '/uslugi/konsulting-e-commerce.md',
                destination: '/uslugi/audyt-e-commerce.md',
                permanent: true,
            },
            // The English consulting page became the e-commerce audit.
            {
                source: '/en/services/e-commerce-consulting',
                destination: '/en/services/e-commerce-audit',
                permanent: true,
            },
            // Managed as a redirect document in Sanity until the move to Payload.
            {
                source: '/psychologia-kolorow-w-ui-ux-jakie-znaczenie-maja-kolory-na-stronie-internetowej',
                destination: '/blog/psychologia-kolorow-w-ui-ux-jakie-znaczenie-maja-kolory-na-stronie-internetowej',
                permanent: true,
            },
            // Retired posts (e.g. outdated 2023 prices) → the current page, HTML and Markdown twin.
            ...Object.entries(retiredBlogPosts as Record<string, string>).flatMap(([slug, destination]) => [
                { source: `/blog/${slug}`, destination, permanent: true },
                { source: `/blog/${slug}.md`, destination: `${destination}.md`, permanent: true },
            ]),
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