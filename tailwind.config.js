/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
  animation: {
    'reveal-text': 'revealText 1.5s cubic-bezier(0.77, 0, 0.175, 1) forwards',
    'image-zoom': 'imageZoom 20s linear infinite alternate',
    'fade-in-up': 'fadeInUp 1s ease-out forwards',
  },
  keyframes: {
    revealText: {
      '0%': { transform: 'translateY(100%)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
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