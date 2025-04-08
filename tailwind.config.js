/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Tutaj możesz dodać własne kolory marki
            },
            animation: {
                dashDraw: 'dashDraw 4s ease-in-out forwards',
                particleFloat: 'particleFloat 4s linear infinite',
            },
            keyframes: {
                dashDraw: {
                    '0%': { strokeDashoffset: '160' },
                    '100%': { strokeDashoffset: '0' },
                },
                particleFloat: {
                    '0%': {
                        transform: 'translateY(0)',
                        opacity: '0.7',
                    },
                    '50%': {
                        transform: 'translateY(-30px)',
                        opacity: '1',
                    },
                    '100%': {
                        transform: 'translateY(-60px)',
                        opacity: '0',
                    },
                },
            },
        },
    },
    plugins: [],
};