/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        math: {
          blue: "#3B82F6",
          green: "#10B981",
          red: "#EF4444",
          yellow: "#F59E0B",
          purple: "#8B5CF6",
          bg: "#EFF6FF", // blue-50
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
