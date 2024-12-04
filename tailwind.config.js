/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunitoBlack: ['Nunito-Black'],
        nunitoBold: ['Nunito-Bold.ttf'],
        nunitoBoldItalic: ['Nunito-BoldItalic'],
        nunitoItalic: ['Nunito-Italic'],
        nunitoLight: ['Nunito-Light'],
        nunitoMedium: ['Nunito-Medium'],
        nunitoRegular: ['Nunito-Regular'],
        nunitoSemiBold: ['Nunito-SemiBold'],
        nunitoSemiBoldItalic: ['Nunito-SemiBoldItalic'],
      },

      fontSize: {
        header: "24px",
        title: "18px",
        normal: "16px",
        medium: "14px",
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

