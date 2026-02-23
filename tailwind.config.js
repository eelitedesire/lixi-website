/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#060a07',
          green: '#00c853',
          greenDim: '#00963e',
          lime: '#b8ff00',
          white: '#f0f4ee',
          grey: '#1a1f1b',
          greyMid: '#2e342f',
        },
        solar: {
          yellow: '#ffd600',
          orange: '#ff6d00',
          blue: '#0091ea',
        }
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'hero': 'clamp(64px, 10vw, 140px)',
        'h2': 'clamp(40px, 6vw, 80px)',
        'h3': 'clamp(24px, 3vw, 36px)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 200, 83, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 200, 83, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
