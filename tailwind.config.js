/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      spacing: {
        "lg": "1.25rem",
        "base": "0.75rem",
        "sm": "0.5rem",
      },
      fontSize: {
        "title": "2rem",
        "sub-title": "1.5rem",
        "text": "1.25rem",
      },
      colors: {
        "dark": "#1e293b",
        "green": {
          "base": "#32c7a5",
          "light": "#58e1c1",
          "dark": "#168b74",
        },
        "purple": {
          "": "#8b73ed",
          "light": "#9c88f4",
        },
        "lime": "d6f443",
        "text": {
          "": "#f4f7f6",
          "secondary": "#aab7b3",
          "muted": "#687571"
        },
        "bg": {
          "main": "#111827"
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}

