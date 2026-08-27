/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // "Red, White & Sand" palette — brand red (from the logo), white, and a
        // soft sand/beige used sparingly for alternating sections and accents.
        cream: {
          DEFAULT: '#FFFDFA', // Neutral, near-white
          dark: '#FBEFE0', // Soft sand, used for alternating sections/pills only
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
