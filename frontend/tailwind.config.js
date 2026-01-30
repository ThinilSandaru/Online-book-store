/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb', // blue-600
          dark: '#1d4ed8',    // blue-700
          light: '#3b82f6',   // blue-500
        },
        secondary: '#0ea5e9', // sky-500
        dark: '#0f172a',      // slate-900
      }
    },
  },
  plugins: [],
}
