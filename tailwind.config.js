export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#F8F9FA',
          primary: '#1A374D',
          secondary: '#007BFF',
          accent: '#343A40' // Darkened for better readability in light mode
        },
        dark: {
          bg: '#041521',
          surface: '#0D2C43',
          card: '#0D2C43',
          border: '#0B2237',
          primary: '#50B5FF',
          secondary: '#75C5FF',
          accent: '#E0E7FF',
          highlight: '#184161'
        },
        'dark-card': '#0D2C43',
        'dark-border': '#0B2237',
        'dark-primary': '#50B5FF',
        'dark-secondary': '#75C5FF',
        'dark-accent': '#E0E7FF',
        'dark-highlight': '#184161'
      }
    },
  },
  plugins: [],
}