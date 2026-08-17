/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#18382a',
          dark: '#10281e',
          light: '#24513d',
        },
        accent: {
          DEFAULT: '#c45d2a',
          hover: '#d66b38',
        },
        cream: '#f7f3ec',
        sand: '#e8dece',
        paper: '#fffdf8',
        ink: '#1f241f',
        muted: '#697267',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        bebas: ['"Bebas Neue"', 'sans-serif'],
        serif: ['"Libre Baskerville"', 'serif'],
        inter: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
