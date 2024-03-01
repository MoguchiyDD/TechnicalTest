/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        "19pr": "19%",
        "24pr": "24%"
      }
    },
  },
  plugins: [],
}
