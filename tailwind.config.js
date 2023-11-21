/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brightBackground: "#FDF8EE",
        brightGreen: "#539165",
        lightText: "#959595",
        white: "white",
        none: "none",
        },
        borderWidth: {
          1: "1px",
        },
        gridTemplateRows: {
          7: "repeat(7, minmax(0, 1fr))",
          8: "repeat(8, minmax(0, 1fr))",
        },
      },
    },
    plugins: [],
  };

