module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['SF Pro', 'Inter', 'sans-serif']
    }
},
  plugins: [
    require('tailwind-bootstrap-grid')(),
    require('daisyui'),
    require('@tailwindcss/aspect-ratio')
  ]
}