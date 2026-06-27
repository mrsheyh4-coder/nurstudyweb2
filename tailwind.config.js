/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef8ff',
          100: '#d9efff',
          500: '#1479ff',
          600: '#0b63db',
          700: '#084aa6',
          900: '#07224c',
        },
        mint: {
          50: '#edfdf5',
          500: '#1dbb7b',
          600: '#119563',
        },
      },
      boxShadow: {
        soft: '0 20px 60px rgba(7, 34, 76, 0.10)',
      },
    },
  },
  plugins: [],
};
