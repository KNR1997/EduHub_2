/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'themeBg2':'#252525',
        'borderColor2': "rgba(249,249,249, 0.08)",
        'colorGrey0': "#f8f8f8",
        'colorGrey3': "#6c7983",
        'activeNavLinkHover': "rgba(249,249,249, 0.03)",
        'colorGreenDark': "#27AE60",
        'activeNavLink': "rgba(249,249,249, 0.08)",
        'colorBlue': "#7263F3",
        
      }
    },
    fontFamily : {
      poppins : ['Poppins', 'sans-serif']
    }
  },
  plugins: [],
}

