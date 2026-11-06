import type { MetadataRoute } from 'next';

/** Web app manifest: home-screen name and icons (Android/Chrome; iOS Safari uses apple-icon.png). */
export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'CreativeTrust',
        short_name: 'creativetrust',
        start_url: '/',
        display: 'standalone',
        theme_color: '#0B0D12',
        background_color: '#0B0D12',
        icons: [
            { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
            { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
            { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
    };
}
