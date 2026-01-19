/** @type {import('tailwindcss').Config} */
export default {
  // Assicurati che questi percorsi coprano TUTTI i tuoi file
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ivory': '#F9F8F3',
        'midnight': '#0F172A',
        'gold-custom': '#B45309',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}