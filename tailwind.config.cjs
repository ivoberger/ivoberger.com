const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "media",
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
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
    transitionDuration: {
      ...defaultTheme.transitionDuration,
      DEFAULT: "300ms",
    },
    extend: {
      colors: {
        gray: {
          ...colors.trueGray,
          "100-t": "rgba(0,0,0, 0.1)",
          "200-t": "rgba(0,0,0, 0.2)",
          "300-t": "rgba(0,0,0, 0.3)",
          "400-t": "rgba(0,0,0, 0.4)",
        },
        lime: colors.lime,
        brand: {
          linkedIn: "#0077b5",
          twitter: "#3d90c4",
          dev: "#0a0a0a",
          stackOverflow: "#f48024",
          github: "#24292e",
        },
      },
      fontFamily: {
        sans: ["Catamaran", ...defaultTheme.fontFamily.sans],
        serif: ["Source Serif Pro", ...defaultTheme.fontFamily.serif],
      },
      maxHeight: {
        0: "0",
        cover: "32rem",
        full: "100%",
      },
      minHeight: {
        0: "0",
        cover: "14rem",
        full: "100%",
      },
    },
    variants: {
      extend: { margin: ["hover", "group-hover"] },
    },
  },
  plugins: [require("tailwindcss-filters"), require("tailwindcss-typography")],
};
