const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    filter: {
      none: "none",
      "grayscale-80": "grayscale(80%)",
      invert: "invert(1)",
      sepia: "sepia(1)",
      blur: "blur(5px)",
    },
    backdropFilter: {
      none: "none",
      blur: "blur(20px)",
    },
    textShadow: {
      default: "0 2px 5px rgba(0, 0, 0, 0.5)",
      lg: "0 2px 10px rgba(0, 0, 0, 0.5)",
    },
    extend: {
      colors: {
        gray: {
          ...defaultTheme.colors.gray,
          "100-t": "rgba(0,0,0, 0.1)",
          "200-t": "rgba(0,0,0, 0.2)",
          "300-t": "rgba(0,0,0, 0.3)",
          "400-t": "rgba(0,0,0, 0.4)",
        },
      },
      fontFamily: {
        sans: ["Catamaran", ...defaultTheme.fontFamily.sans],
        serif: ["Source Serif Pro", ...defaultTheme.fontFamily.serif],
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
  plugins: [require("tailwindcss-filters"), require("tailwindcss-typography")],
};
