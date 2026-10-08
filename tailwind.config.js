/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      animation: {
        'progress': 'grow 2s ease-out'
      },
      keyframes: {
        'grow': {
          "0%": { width: "0%" },
          "100%": { width: "100%" }
        }
      },
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
        dark: "#1e293b",

        green: {
          base: "#32c7a5",
          light: "#58e1c1",
          dark: "#168b74",
        },

        purple: {
          base: "#8b73ed",
          light: "#9c88f4",
        },

        lime: "#d6f443",

        text: {
          DEFAULT: "var(--color-text)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
        },

        bg: {
          main: "var(--color-bg-main)",
          card: "var(--color-bg-card)",
          input: "var(--color-bg-input)",
        },

        border: {
          DEFAULT: "var(--color-border)",
        },
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}

