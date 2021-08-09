module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        mindblue: {
          DEFAULT : '#6495ED'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
