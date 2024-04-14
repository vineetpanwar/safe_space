/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        darkPurple: '#4c0070', // Replace with the hex code for your preferred dark purple.
        mediumPurple: '#8000ff', // Replace with the hex code for a medium shade of purple.
        lightPurple: '#b833ff',  
        'purple-950': '#2a2a72', // This is a dark purple you mentioned earlier.
        'bliss-bubble': '#6246ea', // A placeholder for the chatbot bubble color from your image.
        'user-bubble': '#31c48d', 
        userBubbleColor: '#31c48d', // the user's bubble color from your image
        assistantBubbleColor: '#6246ea', // the assistant's bubble color from your image
        buttonColor: '#5f27cd', // for the Send button, replace with the actual color you need
        buttonHoverColor: '#341f97',     },
    },
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // add any other directories with content
  ],
    theme: {
    extend: {},
  },
  plugins: [],
}

