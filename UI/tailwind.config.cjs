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
        'light': '#F5F3EF',
        'light-secondary': '#EEEEEE',
        'dark': '#111111',
        'dark-secondary': '#222222',
        'error': 'red'
      },
    },
  },
  plugins: [],
}
