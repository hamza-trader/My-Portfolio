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
          bg: '#101E2C',
          surface: '#1B2B3A',
          primary: '#E9ECEF',
          secondary: '#339AF0',
          accent: '#CED4DA', // Lightened for better readability in dark mode
          highlight: '#DEE2E6'
        }
      }
    },
  },
  plugins: [],
}