/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
        RobotoBold: ["Roboto-Bold", "sans-serif"],
        RobotoExtraBold: ["Roboto-ExtraBold", "sans-serif"],
        RobotoExtraLight: ["Roboto-ExtraLight", "sans-serif"],
        RobotoLight: ["Roboto-Light", "sans-serif"],
        RobotoMedium: ["Roboto-Medium", "sans-serif"],
        RobotoSemiBold: ["Roboto-SemiBold", "sans-serif"],
      },
      colors: {
        primary: {
          100: "#f57c00",
          200: "#ffd058",
          300: "#100f0d",
          400: "#ffece4",
          500: "#f1f1f1",
          600: "#ffffff",
          600: "#8f8e8e",
        },
        gradiant: {
          100: "#F8F8F8",
          200: ["#ffb74d", "#f57c00"],
        },
        success: {
          100: "#F0FFF4",
        },
        danger: {
          100: "#FFF5F5",
        },
        warning: {
          100: "#FFFBEB",
        },
      },
    },
  },
  plugins: [],
};