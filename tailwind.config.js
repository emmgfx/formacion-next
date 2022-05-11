module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#FFC5BB",
          300: "#FF8772",
          500: "#FF4C10",
          700: "#ED4811",
          950: "#B7380C",
        },
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
