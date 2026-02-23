/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'slate-dark': '#30364F',
        'blue-grey-muted': '#454C68', // Darkened to stay in the navy family
        'beige-soft': '#f5f5f5', // Changed to a very light grey/off-white
        'off-white-warm': '#ffffff', // Set to pure white as requested
        primary: {
          50: '#ffffff',
          400: '#454C68',
          500: '#30364F',
          600: '#1a1a1a',
          800: '#1a1a1a',
          900: '#000000',
        },
        accent: {
          50: '#ffffff',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#E1D9BC', // Soft Beige
          400: '#bdbdbd',
          500: '#757575',
          600: '#616161',
          700: '#424242',
          800: '#212121',
          900: '#000000',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif', 'system-ui'],
        heading: ['"Playfair Display"', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
