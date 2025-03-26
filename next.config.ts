/** @type {import('next').NextConfig} */
const nextConfig = {
    // Pozostałe konfiguracje
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
                pathname: '/**',
            },
        ],
    },
    // Dodaj tę konfigurację dla Sanity
    experimental: {
        transpilePackages: ["@sanity"],
    },
}

module.exports = nextConfig