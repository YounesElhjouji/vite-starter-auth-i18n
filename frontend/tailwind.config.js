/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Add this line
  content: [
    "./index.html", // Make sure these paths cover all your template files
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
