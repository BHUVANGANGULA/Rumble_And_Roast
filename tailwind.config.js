/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        coffee: {
          dark: '#1C120C',   // Deep roasted coffee brown
          medium: '#4A2C11', // Classic coffee brown
          light: '#8C593B',  // Latte / milk coffee brown
          cream: '#C8A27C',  // Light cream brown
        },
        gold: {
          light: '#F3E5AB',  // Soft light gold
          DEFAULT: '#D4AF37', // Metallic gold
          dark: '#AA7C11',   // Deep antique gold
        },
        cream: {
          DEFAULT: '#F9F6F0', // Warm white / milk cream
          dark: '#EADBC8',    // Soft beige cream
        },
        matte: {
          black: '#121212',  // Ultra dark matte black
          gray: '#1E1E1E',   // Dark gray surface
          light: '#2E2E2E',  // Card gray surface
        }
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 15s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
