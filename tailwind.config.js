/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunitoBlack: ['NunitoSans-Black'],
        nunitoBold: ['NunitoSans-Bold'],
        nunitoBoldItalic: ['NunitoSans-BoldItalic'],
        nunitoItalic: ['NunitoSans-Italic'],
        nunitoLight: ['NunitoSans-Light'],
        nunitoMedium: ['NunitoSans-Medium'],
        nunitoRegular: ['NunitoSans-Regular'],
        nunitoSemiBold: ['NunitoSans-SemiBold'],
        nunitoSemiBoldItalic: ['NunitoSans-SemiBoldItalic'],
      },

      fontSize: {
        header: "24px",
        title: "18px",
        normal: "16px",
        small: "11px"
      },

      colors: {
        main: "#2C7CC1",
        secondary: "#FF6600",
        backButton: "rgba(44, 124, 193, 0.2)"
      }
    },
  },
  plugins: [],
}

