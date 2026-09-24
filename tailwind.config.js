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
          green: '#059669',
          'green-dark': '#047857',
          'green-light': '#ecfdf5',
          blue: '#0284c7',
          'blue-dark': '#0369a1',
          'blue-light': '#f0f9ff',
          amber: '#d97706',
          'amber-light': '#fffbeb',
          purple: '#7c3aed',
          'purple-light': '#f5f3ff',
          teal: '#0d9488',
          'teal-light': '#f0fdfa',
          dark: '#0f172a',
          navy: '#1e293b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', '"Times New Roman"', 'serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 12px 30px -4px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
