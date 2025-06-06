/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        blue: { // Define a custom blue color
          DEFAULT: '#156EFF',
          dark: '#0047AB', // A darker shade of #156EFF
        },
        button: { // New button color
          DEFAULT: '#4988d4',
        },
        primary: {
          light: '#202D40',
          dark: '#1a1a2e'
        },
        secondary: {
          DEFAULT: '#4988d4',
        },
        background: {
          light: '#f8fafc',
          dark: '#121212'
        },
        card: {
          light: '#ffffff',
          dark: '#1e1e1e'
        },
        text: {
          light: '#334155',
          dark: '#e2e8f0'
        },
        accent: {
          light: '#ef4444',
          dark: '#f87171'
        }
      },
    },
  },
  plugins: [],
}
