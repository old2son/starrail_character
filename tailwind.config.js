/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      spacing: {
        '7.5': '1.875rem',
        '8.75': '2.1875rem',
        '12.5': '3.125rem',
      },
      animation: {
        'fade-in-out': 'fadeInOut 2s ease-in-out forwards',
      },
      keyframes: {
        fadeInOut: {
          '0%': { opacity: '0', transform: 'translate(-50%, -20px)' },
          '10%, 90%': { opacity: '1', transform: 'translate(-50%, 0)' },
          '100%': { opacity: '0', transform: 'translate(-50%, -20px)' },
        },
      },
    },
  },
  plugins: [],
}
