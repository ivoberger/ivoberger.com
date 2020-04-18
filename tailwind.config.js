const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      colors: {
        gray: {
          ...defaultTheme.colors.gray,
          "100-t": "rgba(0,0,0, .3)",
        },
      },
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
  variants: {
    textColor: ["responsive", "hover", "focus", "group-hover"],
    borderWidth: ["responsive", "hover", "focus", "group-hover"],
    borderColor: ["responsive", "hover", "focus", "group-hover"],
    margin: ["responsive", "hover", "focus", "group-hover"],
  },
  plugins: [],
};
