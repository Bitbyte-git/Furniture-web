/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sage: { DEFAULT: '#8A9A5B', dark: '#6B7B4C', light: '#A8B87A' },
        beige: { DEFAULT: '#F5F0E8', dark: '#E8E0D4' },
        cream: '#FAF8F5',
        charcoal: '#1A1A1A',
        olive: '#6B7B4C',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
