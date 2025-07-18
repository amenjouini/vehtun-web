/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Change 'Urbaniva' to '"Exo 2"'
        'poppins': ['"Exo 2"', 'sans-serif'] 
      },
      colors: {
        primary: {
          '300': '#FFB565', // Lighter orange
          '500': '#FF8A18', // Main orange
          '600': '#E86C2B', // Slightly darker orange for hover
          '900': '#B35A2A', // Even darker orange if needed
          '1100': '#FEF3C7'
        },
        secondary: {
          '500': '#2E8074', // Main teal
          '700': '#005461', // Darker teal
          '800': '#18626F', // Even darker teal
          '900': '#7697A0', // Very dark teal, ideal for backgrounds
        },
      },
    },
  },
  plugins: [],
}

