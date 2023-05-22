const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'main-desktop': "url('./images/bg-main-desktop.png')",
        'main-mobile': "url('./images/bg-main-mobile.png')",
        'card-front': "url('./images/bg-card-front.png')",
        'card-back': "url('./images/bg-card-back.png')",
      },
      screens: {
        sm: '375px',
        lg: '1440px',
      },
      colors: {
        red: 'hsl(0, 100%, 66%)',
        white: 'hsl(0, 0%, 100%)',
        'light-grayish-violet': 'hsl(270, 3%, 87%)',
        'dark-grayish-violet': 'hsl(279, 6%, 55%)',
        'very-dark-violet': 'hsl(278, 68%, 11%)',
        'brilliant-blue': 'hsl(249, 99%, 64%)',
      },
      fontFamily: {
        spaceGrotesk: ['Space Grotesk', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
