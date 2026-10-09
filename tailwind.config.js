/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pum: {
          green: '#265454',
          greenAlt: '#2B5C5C',
          greenDark: '#1A3B3B',
          lightGreen: '#D6E7D8',
          mintLight: '#EAF3EC',
          orange: '#FF8538',
          orangeHover: '#E67327',
          yellow: '#E3C882',
          sand: '#F4F0E8',
          bgLight: '#F8FAF9',
          blue: '#729ACD',
        },
        brand: {
          green: '#265454',
          'green-dark': '#1A3B3B',
          'green-light': '#D6E7D8',
          blue: '#729ACD',
          'blue-dark': '#0369a1',
          'blue-light': '#f0f9ff',
          amber: '#FF8538',
          'amber-light': '#fffbeb',
          purple: '#7c3aed',
          'purple-light': '#f5f3ff',
          teal: '#2B5C5C',
          'teal-light': '#EAF3EC',
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
