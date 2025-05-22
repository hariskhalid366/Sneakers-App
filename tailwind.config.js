/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#0D6EFD',
        parcent: '#674DC5',
        background: '#F7F7F9',
        imageBackground: '#EBEEF0',
      },
    },
  },
  plugins: [],
};
