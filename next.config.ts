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
    // Przeniesiono z experimental.transpilePackages do transpilePackages na głównym poziomie
    transpilePackages: ["@sanity"],
}

module.exports = nextConfig