


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
         'primary': '#cc9188',
        'secondary':  '#839958',
        'background': '#f7f4d5',
        'font':        '#3e2c29',
        'special': '#105666',
        'shadow': '#0a3323',
      },
    },
  },
  plugins: [],
}