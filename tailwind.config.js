/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Logo Teal/Cyan (mano derecha + "MARÍA")
          teal: '#2BBEC9',
          'teal-dark': '#1E9EAA',
          'teal-light': '#e6f9fb',
          // Logo Crimson/Maroon (mano izquierda + "JESÚS" + estrellas)
          coral: '#8B1C1C',
          'coral-dark': '#6E1515',
          'coral-light': '#f5e8e8',
          // Charcoal for text (MANOS ABIERTAS)
          navy: '#2C2C2C',
          dark: '#1e293b',
          // Gold for accents/highlights
          gold: '#C9922B',
          'gold-dark': '#A87520',
          'gold-light': '#fef7e6',
          muted: '#64748b'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        handwritten: ['Caveat', 'cursive', 'sans-serif']
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
