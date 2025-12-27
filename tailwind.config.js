/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#127ae2',
          dark: '#0e5a9e',
          light: '#3385FF',
        },
        secondary: {
          DEFAULT: '#101922',
          light: '#334155',
        },
        surface: {
          light: '#f6f7f8',
          gray: '#F8FAFC',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
