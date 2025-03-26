/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.sanity.io'], // Aby umożliwić ładowanie obrazów z Sanity
    },
    // Możesz dodać tutaj inne opcje konfiguracyjne
};

export default nextConfig;