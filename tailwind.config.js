/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: { rotate: {
      '30': '30deg'
    }},
  },
  plugins: [
    require('flowbite/plugin')
]
}

