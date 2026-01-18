/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'thetis-gold': '#D4AF37', // Un tocco elegante per un'associazione culturale
      }
    },
  },
  plugins: [],
}