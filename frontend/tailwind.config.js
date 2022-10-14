/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "375px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
      //default sans font is roboto
      sans: ["Roboto"],
      //to access use 'font-navfont'
      navFont: ["Inter", "sans-serif"],
      navFontRS: ["Roboto Serif", "serif"],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      // to access use text-pink (or any prefix)
      neonPink: "#EE00FF",
      neonBlue: "#00A2FF",
      navy: "rgb(17 24 39);",
      darkPurple: "#9600ff",
      mafiaRed: "#c9291a",
    },
    dropShadow: {
      titleLeft: ["0 0 50px rgb(238,0,255)", "0 0 4px rgb(0,162,255)"],
      titleRight: ["0 0 50px rgb(0, 162, 255)", "0 0 4px rgb(238, 0, 255)"],
      mafia: ["0 0 50px #c9291a"],
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
