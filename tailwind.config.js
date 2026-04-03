/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        surface: '#111118',
        'surface-2': '#1a1a25',
        border: 'rgba(255,255,255,0.06)',
        'border-2': 'rgba(255,255,255,0.12)',
        'text-primary': '#f0f0f5',
        'text-secondary': '#9090a8',
        'text-tertiary': '#5a5a72',
        accent: '#f97316',
        'accent-dim': 'rgba(249,115,22,0.12)',
        'accent-hover': '#fb923c',
        success: '#22c55e',
        'success-dim': 'rgba(34,197,94,0.12)',
        error: '#ef4444',
        'error-dim': 'rgba(239,68,68,0.12)',
        info: '#3b82f6',
        'info-dim': 'rgba(59,130,246,0.12)',
        warning: '#eab308',
        'warning-dim': 'rgba(234,179,8,0.12)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'xl': '16px',
        'lg': '12px',
        'md': '10px',
        'sm': '8px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'bounce-in': 'bounceIn 0.5s ease-out',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '50%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
