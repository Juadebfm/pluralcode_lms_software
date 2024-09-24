/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        gilroy: ["Gilroy", "sans-serif"],
        gilroy_thin: ["Gilroy_Thin", "sans-serif"],
        gilroy_light: ["Gilroy_Light", "sans-serif"],
        gilroy_semibold: ["Gilroy_Semibold", "sans-serif"],
        gilroy_bold: ["Gilroy_Bold", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        heading_1: "28px",
        heading_2: "22px",
        big_text: "18px",
        small_text: "14px",
      },
      colors: {
        pc_blue: "#222057",
        pc_black: "#232323",
        pc_orange: "#f8991d",
        pc_light_gray: "#939393",
        pc_dark_gray: "#323232",
        pc_white_white: "#ffffff",
        pc_bg: "#f5f6fa",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
