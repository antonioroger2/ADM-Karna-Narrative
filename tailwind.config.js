/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'epic': ['Merriweather', 'Georgia', 'serif'],
      },
      colors: {
        'mahabharata-gold': '#D4AF37',
        'mahabharata-red': '#8B0000',
        'mahabharata-brown': '#6B4423',
        'epic-background': '#FAF0E6',
      },
      backgroundImage: {
        'epic-gradient': 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(139, 0, 0, 0.1) 100%)',
      },
      boxShadow: {
        'epic': '0 10px 40px rgba(0,0,0,0.1), 0 20px 60px rgba(0,0,0,0.05)',
      },
      animation: {
        'subtle-float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}