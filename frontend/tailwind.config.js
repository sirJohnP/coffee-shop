/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#fdf8f3',
          100: '#f9e9dc',
          200: '#f0d3bd',
          300: '#e6bfa0',
          400: '#dca985',
          500: '#c98a5c',
          600: '#b07047',
          700: '#8c5838',
          800: '#6d442b',
          900: '#4d301f',
        },
      },
    },
  },
  plugins: [],
}