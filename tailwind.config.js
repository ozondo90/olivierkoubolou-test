/** @type {import('tailwindcss').Config} */
const { addDynamicIconSelectors } = require("@iconify/tailwind");

module.exports = {
  content: ["./src/**/*.{html,js}", "./index.html"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(-220.55deg, #0059b9 0%, #0054b5 40%, #000e6e 100%)",
      },
      minHeight: {
        "screen-90": "70vh",
      },
    },
  },
  plugins: [
    // Iconify plugin
    addDynamicIconSelectors(),
  ],
};
