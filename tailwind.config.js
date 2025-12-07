/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // Enable manual dark mode toggle
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,html}",
        "./*.html"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            colors: {
                primary: {
                    DEFAULT: '#0f172a', // Slate 900
                    light: '#1e293b',   // Slate 800
                },
                accent: {
                    DEFAULT: '#fbbf24', // Amber 400
                    hover: '#f59e0b',   // Amber 500
                }
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                }
            }
        },
    },
    plugins: [],
}
