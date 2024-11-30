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
    },
  },
  plugins: [],
}

