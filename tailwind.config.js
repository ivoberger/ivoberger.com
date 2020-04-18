const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Catamaran", ...defaultTheme.fontFamily.sans],
        serif: ["Source Serif Pro", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  variants: {},
  plugins: [],
};
