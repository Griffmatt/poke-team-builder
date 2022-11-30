/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#D22C4A',
        'secondary': '#803385',
        'light': '#FFFFFF',
        'light-secondary': '#F5F3EF',
        'dark': '#000000',
        'dark-secondary': '#111111',
        'error': 'red'
      },
    },
  },
  plugins: [],
}
