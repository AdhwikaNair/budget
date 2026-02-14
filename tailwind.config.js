/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#70b4a4', // Teal (Photo/Music Title Bars)
                    hover: '#60a494',
                },
                secondary: {
                    DEFAULT: '#f4a464', // Orange (Loading Title Bars)
                    hover: '#e49454',
                },
                accent: {
                    DEFAULT: '#fcc45c', // Yellow (Accents/Buttons)
                    hover: '#ecb44c',
                },
                os: {
                    bg: '#d0e0ff',      // Light Blue Graph Paper base
                    window: '#faefe1',  // Cream/Beige Window surface
                    bar: '#faefe1',     // Cream Taskbar
                    border: '#3a2e2a',  // Dark Brown/Charcoal Borders
                    text: '#3a2e2a',    // Dark Brown Text
                },
                bg: {
                    dark: '#3a2e2a',
                    surface: '#faefe1',
                    plum: '#d0e0ff',
                },
                text: {
                    main: '#3a2e2a',
                    muted: '#6a5e5a',
                    dim: '#8a7e7a',
                },
                success: '#90e0b0',
                danger: '#ff80a0',
            },
            fontFamily: {
                pixel: ['"Pixelify Sans"', 'sans-serif'],
                sans: ['Inter', 'sans-serif'],
            },
            boxShadow: {
                'pixel-sm': '3px 3px 0 0 #3a2e2a',
                'pixel-md': '5px 5px 0 0 #3a2e2a',
                'pixel-lg': '8px 8px 0 0 #3a2e2a',
                'pixel-inner': 'inset 4px 4px 0 0 rgba(0, 0, 0, 0.1)',
                'os-beveled': '2px 2px 0 0 #3a2e2a', // Tight flat beveled
                'os-pressed': 'inset 2px 2px 0 0 #3a2e2a',
                'os-taskbar': '0 -5px 0 0 #3a2e2a',
            },
            animation: {
                'pixel-bounce': 'pixelBounce 1.2s steps(4) infinite',
                'pixel-pop': 'pixelPop 0.25s steps(3) forwards',
                'heart-beat': 'heartBeat 1.5s steps(4) infinite',
                'fade-in': 'fadeIn 0.5s steps(5) forwards',
                'slide-up': 'slideUp 0.4s steps(4) forwards',
                'sweep-plum': 'sweepPlum 0.8s steps(6) forwards',
                'boot': 'boot 0.6s steps(6) forwards',
            },
            keyframes: {
                pixelBounce: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-6px)' },
                },
                pixelPop: {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.15)' },
                    '100%': { transform: 'scale(1)' },
                },
                heartBeat: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '25%, 75%': { transform: 'scale(1.1)' },
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                sweepPlum: {
                    '0%': { transform: 'translateX(-100%)' },
                    '50%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
                boot: {
                    '0%': { transform: 'scale(0.8)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                }
            }
        },
    },
    plugins: [],
}
