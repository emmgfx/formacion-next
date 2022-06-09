module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-light": "var(--color-primary-light)",
        "primary-dark": "var(--color-primary-dark)",
        "primary-darkest": "var(--color-primary-darkest)",
        secondary: {
          100: "#F3C1FF",
          300: "#D74FFA",
          500: "#B903E7",
          700: "#9A00C0",
          950: "#680085",
        },
        gray: {
          white: "#FFFFFF",
          light: "#95949B",
          medium: "#242531",
          dark: "#141524",
          black: "#000000",
        },
        success: "#00C74F",
        error: "#F20707",
        info: "#21A7F9",
        alert: "#FFE600",
      },
    },
  },
  plugins: [],
};
