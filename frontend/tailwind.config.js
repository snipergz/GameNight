/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
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
      // to access use text-pink (or any prefix)
      pink: "#EE00FF",
      blue: "#00A2FF",
    },
    dropShadow: {
      titleLeft: ["0 0 50px rgb(238,0,255)", "0 0 7px rgb(0,162,255)"],
      titleRight: ["0 0 50px rgb(0, 162, 255)", "0 0 5px rgb(238, 0, 255)"],
    }
  },
  plugins: [],
};