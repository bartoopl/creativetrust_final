import type { NextConfig } from 'next';
// Blog posts replaced by a current page (301 here, left out of llms.txt and the
// sitemap): AI answers quote outdated 2023 prices and trends.
import retiredBlogPosts from './retired-blog-posts.json';
import { RETIRED_SERVICE_PAGES } from './src/lib/retired-links';

const nextConfig: NextConfig = {
    poweredByHeader: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
                pathname: '/**',
            },
        ],
    },
    transpilePackages: ["@sanity"],
    productionBrowserSourceMaps: false,
    // Two root layouts ((pl) and en): unmatched URLs render src/app/global-not-found.tsx.
    experimental: { globalNotFound: true },
    async redirects() {
        return [
            // Retired service pages → the closest live page (the same map rewrites post bodies).
            ...Object.entries(RETIRED_SERVICE_PAGES).map(([source, destination]) => ({ source, destination, permanent: true })),
            // Retired posts (e.g. outdated 2023 prices) → the current page, HTML and Markdown twin.
            ...Object.entries(retiredBlogPosts as Record<string, string>).flatMap(([slug, destination]) => [
                { source: `/blog/${slug}`, destination, permanent: true },
                { source: `/blog/${slug}.md`, destination: `${destination}.md`, permanent: true },
            ]),
        ];
    },
    async headers() {
        return [
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

export default nextConfig;