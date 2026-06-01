import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          beige: '#FAF5EF',
          dark: '#111111',
          gold: '#B58E45',
          blue: '#3E5F8A',
          blueLight: '#4E73A5',
          blueDark: '#2F4A6D',
        }
      },
      fontFamily: {
        space: ["'Space Grotesk'", "sans-serif"],
        outfit: ["'Outfit'", "sans-serif"],
        neue: ["'Neue Machina'", "sans-serif"],
        inter: ["'Inter'", "sans-serif"],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
};

export default config;
