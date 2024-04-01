import type { Config } from "tailwindcss";
const defaultTheme = require('tailwindcss/defaultTheme')

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx,css}",
    "./app-pages/**/*.{js,ts,jsx,tsx,mdx,css}",
    "./components/**/*.{js,ts,jsx,tsx,mdx,css}",
    "./providers/**/*.{js,ts,jsx,tsx,mdx,css}",
  ],
  theme: {
    extend: {
      screens: {
        '-sm': {
          max: '639px'
        },
        '3xl': '1700px'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        header: ['var(--font-ubuntu)', ...defaultTheme.fontFamily.serif],
      },
      fontSize: {
        '0': '0',
        lg: '1.25rem',
        xl: '2rem',
        '2xl': '2.25rem',
        '3xl': '4rem',
        '4xl': '5rem',
        '5xl': '8rem',
        '6xl': '9rem',
        '7xl': '12rem',
        '8xl': '14rem',
        '9xl': '18rem',
      },
      letterSpacing: {
        wide: '3px',
        widest: '5px',
      },
      lineHeight: {
        '0': '0',
        'over-loose': '0.9'
      },
      textUnderlineOffset: {
        3: '3px',
      },
      height: {
        'half': '50vh',
        'twoThirds': '66.66667vh',
        'oneThird': '33.33337vh'
      },
      width: {
        'half': '50vw',
        'twoThirds': '66.66667vw'
      },
      maxWidth: {
        '1/2': '50%',
        '1/3': '33.33337%',
        '2/3': '66.66667%'
      },
      zIndex: {
        '1': '1',
        rightNav: '30',
        header: '35',
        max: '1000'
      },
      spacing: {
        full: '100%'
      }
    },
  },
  separator: '_',
  plugins: [],
};
export default config;
