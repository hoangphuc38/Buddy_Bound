/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
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
        interBlack: ['Inter_18pt-Black'],
        interBold: ['Inter_18pt-Bold'],
        interLight: ['Inter_18pt-Light'],
        interMedium: ['Inter_18pt-Medium'],
        interRegular: ['Inter_18pt-Regular'],
        interExtraBold: ['Inter_18pt-ExtraBold'],
        interExtraLight: ['Inter_18pt-ExtraLight'],
      },

      fontSize: {
        header: '24px',
        headerTitle: '22px',
        title: '18px',
        normal: '16px',
        medium: '14px',
        small: '11px',
      },

      colors: {
        main: '#535862',
        primary: '#2C7CC1',
        secondary: '#FF6600',
        backButton: 'rgba(44, 124, 193, 0.2)',
        contentPost: 'rgba(124, 121, 121, 0.8)',
        placeHolder: '#7C7979',
        tooltip: 'rgba(255, 255, 255, 0.68)',
        markerbg: 'rgba(255, 255, 255, 0.9)',
        inputbg: '#E9EAEB',
      },
    },
  },
  plugins: [],
};


