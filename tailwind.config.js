/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fdf8f0',
          100: '#faefd9',
          200: '#f5ddb0',
          300: '#edc97e',
          400: '#c8a96e',  // ← основной акцент (золото)
          500: '#b8923a',  // ← кнопки, hover
          600: '#9a7a2e',
          700: '#7a5f22',
          800: '#5c4518',
          900: '#3d2d0e',
        },
        dark: {
          900: '#1c1f26',  // ← основной фон
          800: '#22262f',
          700: '#282d38',
          600: '#2f3542',
          500: '#3a4154',
          400: '#464e63',
        },
        navy: {
          900: '#1c1f26',  // ← совпадает с dark для совместимости
          800: '#22262f',
          700: '#282d38',
          600: '#2f3542',
          500: '#3a4154',
          400: '#464e63',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
        serif:   ['Instrument Serif', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.7s ease-out',
        'slide-right': 'slideRight 0.6s ease-out',
        'counter': 'counter 2s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'truck': 'truck 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(40px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideRight: { from: { opacity: '0', transform: 'translateX(-30px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        truck: { from: { transform: 'translateX(-120%)' }, to: { transform: 'translateX(120vw)' } },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      backgroundImage: {
        'grid-dark': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'glow-orange':    '0 0 40px rgba(200, 169, 110, 0.15)',
        'glow-orange-lg': '0 0 80px rgba(200, 169, 110, 0.25)',
        'card-dark':      '0 4px 24px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
}
