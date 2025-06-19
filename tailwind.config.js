/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        scb: {
          purple: '#4E2E7F',
          'purple-light': '#6B46C1',
          'purple-dark': '#3730A3',
          gold: '#FFD700',
          'gold-light': '#FFF59D',
          'gold-dark': '#FF8F00',
          gray: {
            50: '#F9FAFB',
            100: '#F3F4F6',
            200: '#E5E7EB',
            300: '#D1D5DB',
            400: '#9CA3AF',
            500: '#6B7280',
            600: '#4B5563',
            700: '#374151',
            800: '#1F2937',
            900: '#111827',
          }
        }
      },
      fontFamily: {
        'scb': ['Sukhumvit Set', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}