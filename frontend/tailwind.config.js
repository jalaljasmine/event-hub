/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#111827',
        secondary: '#6b7280',
        accent: '#2563eb',
        border: '#e5e7eb',
      },
    },
  },
  plugins: [],
}
