const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Catamaran", ...defaultTheme.fontFamily.sans],
        serif: ["Source Serif Pro", ...defaultTheme.fontFamily.serif],
        mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
      },
      maxHeight: {
        "0": "0",
        cover: "32rem",
        full: "100%",
      },
    },
  },
  variants: {},
  plugins: [],
};
