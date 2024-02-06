const { url } = require('inspector');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      primary: '#F2F2F2',
      secondary: '#121212',
      tertiary: '#CCCCCC',
      test: 'red',
    },
    extend: {
      backgroundImage: {
        'container-homepage': url('/public/container-homepahe.jpg'),
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
