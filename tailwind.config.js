/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#CC5216",
        secondary: {
          1: "#645765",
          2: "#8DA1AA",
        },
      },
      backgroundImage: {
        "boba-bg": "url(/boba-bg.jpg)",
      },
    },
  },
  plugins: [],
};
