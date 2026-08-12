/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F2EADF',
          dark: '#E8DCC8',
        },
        ink: {
          DEFAULT: '#1A1A1C',
          light: '#222224',
        },
        wine: {
          DEFAULT: '#6C2529',
          dark: '#4E1B1E',
          light: '#8A3238',
        },
        sand: '#C9B99A',
      },
      fontFamily: {
        display: ['Dosis', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        arch: '50% 50% 0 0',
      },
    },
  },
  plugins: [],
};
