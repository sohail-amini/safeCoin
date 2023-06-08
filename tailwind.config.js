/** @type {import('tailwindcss').Config} */
module.exports = {
  // mode: "jit",
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    screens: {
      'xl': {'max': '1279px'},
      'md': {'max': '950px'},
      'sm': {'max': '650px'},
    },
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
}