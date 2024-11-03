/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xxs: "255px",
      xs: "475px",
      xmd: "978px",
      "2.5xl": "1700px",
      "1.5xl": "1450px",
      "0.5xl": "1152px",
      "1.4md": "868px",

      ...defaultTheme.screens,
    },

    extend: {
      fontSize: {
        "8p": "14px",
      },
      borderWidth: {
        1: "1px",
      },
      height: {
        800: "800px",
        900: "900px",
      },
      width: {
        1000: "1000px",
      },
      colors: {
        "ri-orange": "#fdc100",
        "ri-blue": "#4267B2",
        "ri-blue-dark": "#34518d",
        "ri-yellow": "#feea3a",
        "ri-grey": "#",
        "ri-white": "#f2f2f2",
        "ri-skin": "#EFD8BC",
      },
      fontFamily: {
        sans: ["Open Sans", "sans"],
      },
    },
  },
};
