/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add your custom font colors here
        'pageHead': '#482E92',
        'primary': '#0062FF', 
        'pagebg': '#F2F3F7',
        'form':"#9A9AAF",
        'delete':"#FD4438",
        'outerline': "#E2E2EA"
      },
      screen:{
       
        md:"768px",
        lg:"976px",
        xl:"1440px"
      }
      
    },
  },
  plugins: [],
}