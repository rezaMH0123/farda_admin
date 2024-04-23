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
        W1: "#FFFFFF",
        Gray: "#E1E1E1",
        Blue: {
          PrimaryBlue: "#33BDF1",
          BlueHover: "#19B6F1",
          BlueClick: "#00ABEB",
          CardBack: "#DEE8FF",
        },
        Red: {
          R1: "#FF8A8A",
          R2: "#F93838"
        },
        Black: {
          PrimaryBlack: "#525252",
          B2: "#565656",
          B3: "#B3B3B3",
          B4: "#A9A5A5",
          B5: "#EBEBEB",
          B6: "#E6E6E6"
        },
        Green: {
          G1: "#41CD92",
          G2: "#D8FBDE",
          G3: "#35B17D"
        },
        Linear: {
          L1: {
            1: "#0575E6",
            2: "#02298A",
            3: "#021B79"
          }
        },
        Back: {
          Back1: "#EFF4FF",
          Back2: "#EFF4FF",
          Back3: "#919EAB"
        },
        Error: {
          Error1: "#7A4100",
          Error2: "#FFAB00",
          Error3: "#FFE9D5"
        },
      },
    },
  },
  plugins: [],
};
