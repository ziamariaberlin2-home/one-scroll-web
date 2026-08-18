/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // "Sunset Warm" palette
        cream: {
          DEFAULT: '#FFF7ED', // Neutral
          dark: '#FFEDD5',
        },
        ink: {
          DEFAULT: '#7C2D12', // Text
          light: '#9A3412',
        },
        wine: {
          DEFAULT: '#C53416', // Primary red
          dark: '#991B1B', // darker red for hover states + accessible text-on-light use
          light: '#F2704B', // Secondary light red
        },
        sand: '#F2704B', // Secondary light red
        accent: '#DC2626', // Accent
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
