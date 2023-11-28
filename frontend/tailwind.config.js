/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "dracula",
      "pastel",
      "dim",
      "lofi",
      "cupcake",
      "nord",
      {
        rosepine: {
          primary: "#c4a7e7",
          secondary: "#ebbcba",
          accent: "#f6c177",
          neutral: "#191724",
          "base-100": "#1f1d2e",
          info: "#31748f",
          success: "#9ccfd8",
          warning: "#f6c177",
          error: "#eb6f92",
        },
      },
      {
        "gruvbox-light": {
          primary: "#af3a03",
          secondary: "#b57614",
          accent: "#427b58",
          neutral: "#3c3836",
          "base-100": "#f9f5d7",
          "base-content": "#3c3836",
          info: "#31748f",
          success: "#79740e",
          warning: "#b57614",
          error: "#9d0006",
        },
      },
      {
        espresso: {
          primary: "#F08D71",
          secondary: "#F07194",
          accent: "#F07194",
          neutral: "#E4E3E1",
          "base-100": "#312C2B",
          "base-content": "#E4E3E1",
          info: "#81D0C9",
          success: "#A6CD77",
          warning: "#F0C66F",
          error: "#F86882",
        },
      },
    ],
  },
};
