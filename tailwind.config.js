/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: '#F9F8F3',
        midnight: '#0F172A',
        'gold-custom': '#B45309',
        'gold-light': '#D97706',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'reveal-text': 'revealText 1.5s cubic-bezier(0.77, 0, 0.175, 1) forwards',
        'grow-line': 'growLine 1.5s ease-out forwards',
        'image-zoom': 'imageZoom 20s linear infinite alternate',
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
      },
      keyframes: {
        revealText: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        growLine: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        imageZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.15)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}