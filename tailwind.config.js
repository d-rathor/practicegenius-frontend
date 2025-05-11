/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B00', // Orange
          dark: '#E05A00',
          light: '#FF8A3D',
        },
        secondary: {
          DEFAULT: '#333333', // Black
          light: '#555555',
          dark: '#111111',
        },
        accent: {
          DEFAULT: '#FFD700', // Gold
          light: '#FFDF4D',
          dark: '#D4AF37',
        },
        background: {
          DEFAULT: '#F8F9FA',
          dark: '#E9ECEF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 10px 15px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
