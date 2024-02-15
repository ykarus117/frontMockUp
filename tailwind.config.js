/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      purple: colors.purple,
      violet: colors.violet,
      slate: colors.slate,
      sky: colors.sky,
      pink: colors.pink,
      red: colors.red,
      fuchsia: colors.fuchsia,
      blue: colors.blue,
      cyan: colors.cyan,
      teal: colors.teal,
      green: colors.green,
      lime: colors.lime,
      amber: colors.amber,
      orange: colors.orange,
      emerald: colors.emerald,
      indigo: colors.indigo,
      stone: colors.stone,
      zinc: colors.zinc,
      yellow: colors.yellow,
      rose: colors.rose,
      'gold': {
50: '#fffdf2',
        100: '#fff8c2',
        200: '#ffea8a',
        300: '#ffdf5d',
        400: '#ffcc29',
        500: '#ffbb00',
        600: '#f2a900',
        700: '#e69500',
        800: '#d18500',
        900: '#b56900'
      },
    },
    extend: {},
  },
  plugins: [],
}

