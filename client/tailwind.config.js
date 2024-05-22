/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      height:{
        header:'560px',
        rate:'400px',
      },
      fontSize:{
        h1:'2.6rem',
      },
      screens:{
        xs:'475px',
      },
      colors:{
        main:'#080A1A',
        subMain:'#0679b8',
        dry:'#0B0F29',
        start:'#FFB000',
        text:'#C0C0C0',
        border:'#4b5563',
        dryGrey:'#E0D5D5'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

