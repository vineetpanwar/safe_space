import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
    },
  },
  variants: {
    extend: {
      backgroundColor: ['hover'], // Enable hover variant for background-color
      textColor: ['hover'], // Enable hover variant for text-color
    },
  },
  plugins: [require("daisyui")],
};
export default config;
