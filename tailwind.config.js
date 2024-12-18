/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        purple:"#f5f5f5",
        greenish:'#26A95E',
        golden:"#d4af37",
        lightPurple:"#fff",        
      },
    },
    fontFamily: {

      Teko : [ "Teko", 'sans-serif'],
      Karma: ["Karma",'sans-serif'],
      NotoSansHindi: ["Noto Sans Devanagari",'sans-serif'],
      notoGujarati : ["Anek Gujarati", 'sans-serif']

      
    },
  },
  plugins: [],
};
