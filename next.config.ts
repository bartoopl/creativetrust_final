import type { NextConfig } from 'next';

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
    async redirects() {
        return [
            {
                source: '/uslugi/performance-marketing',
                destination: '/uslugi',
                permanent: true,
            },
            {
                source: '/uslugi/performance-marketing/google-ads',
                destination: '/uslugi',
                permanent: true,
            },
            {
                source: '/uslugi/performance-marketing/meta-ads',
                destination: '/uslugi',
                permanent: true,
            },
            {
                source: '/uslugi/audyt-google-ads',
                destination: '/uslugi',
                permanent: true,
            },
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