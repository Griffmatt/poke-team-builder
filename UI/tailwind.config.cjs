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
        'primary': '#12529F',
        'secondary': '#B70306',
        'light': '#EEEEEE',
        'light-secondary': '#F5F3EF',
        'dark': '#111111',
        'dark-secondary': '#222222',
        'error': 'red'
      },
    },
  },
  plugins: [],
}
