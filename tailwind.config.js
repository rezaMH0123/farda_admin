/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    boxShadow: {
      custom1: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
    },

    extend: {
      animation: {
        enter: "enter .8s ease-out",
        leave: "leave .45s ease-in forwards",
      },
      keyframes: {
        enter: {
          "0%": {
            opacity: "0",
            transform: "scale(.9)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        leave: {
          "0%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "100%": {
            opacity: "0",
            transform: "scale(.9)",
          },
        },
      },
      fontFamily: {
        Shabnam: ["Shabnam"],
      },
      colors: {
        PrimaryBlue: {
          100: "#33BDF1",
          200: "#19B6F1",
          300: "#00ABEB",
          400: "#EFF4FF",
        },
        PrimaryBlack: {
          100: "#525252",
          200: "#565656",
          300: "#B3B3B3",
          400: "#616161",
          500: "#667085",
          600: "#696969",
          700: "#868686",
          800: "#A9A5A5",
        },
        PrimaryGreen: {
          100: "#76f18b",
        },
        PrimaryRed: {
          100: "#ff8a8a",
          200: "#f93838",
        },
      },
    },
  },
  plugins: [],
};
