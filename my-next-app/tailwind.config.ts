import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'background',
    //     foreground: "var(--foreground)",
        'orange1',
        'orange2',
        'orange3',
        'orange4', 
        'orange5',
        'orange6',
        'orange7',

        'gray1',
        'gray2',
        'gray3',
        'gray4',
        'gray5',
        'gray6',

        'green1',
        'green2',
        'green3',
        'green4'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'custom-gradient': "linear-gradient(180deg, #FFFFFF 0%, #FFC993 76%, #FFF8F1 100%)",
        'text-gradient': 'linear-gradient(90.23deg, #FF8100 -2.97%, #FFBE71 93.66%)',
      },
      colors: {
        background: "#FFF8F1",
        foreground: "var(--foreground)",

        orange1: "#AF5901",
        orange2: "#FF8100",
        orange3: "#FF8C05",
        orange4: "#FF9921",
        orange5: "#FFA500",
        orange6: "rgba(255, 129, 0, 0.05)",
        orange7: "rgba(255, 153, 33, 0.5)",
        orange8: "rgba(255, 129, 0, 0.4)",

        gray1: "#16120D",
        gray2: "#050505",
        gray3: "rgba(0, 0, 0, 0.5)",
        gray4: "#2F2F2F",
        gray5: "#F8F8F8",
        gray6: "#525256",

        green1: "rgba(0, 128, 0, 0.05)",
        green2: "#01C550",
        green3: "#008000",
        green4: "#05C605",
      },
    },
  },
  plugins: [],
};
export default config;
