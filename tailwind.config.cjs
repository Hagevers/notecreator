/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#28586D",

          secondary: "#fca6a8",

          accent: "#6f9fc6",

          neutral: "#1D1924",

          "base-100": "#2B303B",

          info: "#4569D3",

          success: "#0C5F41",

          warning: "#AC7506",

          error: "#f84d5d",

        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
