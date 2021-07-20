module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media",
  theme: {
    extend: {
      spacing: {
        "10/12": "83.333333%",
        "11/12": "91.666667%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
