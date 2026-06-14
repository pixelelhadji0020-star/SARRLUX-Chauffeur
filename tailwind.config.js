/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#E2C99A',
          DEFAULT: '#C9A97A',
          dark: '#8B6F47',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(201,169,122,0.2)' },
          '50%': { boxShadow: '0 0 24px rgba(201,169,122,0.5)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        carDrive: {
          '0%': { transform: 'translateX(-10px)' },
          '50%': { transform: 'translateX(4px)' },
          '100%': { transform: 'translateX(-10px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 3s linear infinite',
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
        fadeIn: 'fadeIn 0.8s ease-out forwards',
        glowPulse: 'glowPulse 2.5s ease-in-out infinite',
        slideInLeft: 'slideInLeft 0.5s ease-out forwards',
        carDrive: 'carDrive 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
