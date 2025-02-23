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
      colors: {
        sun: {
          yellow: '#dfc18a',
          DEFAULT: '#e7c6b4'
        }
      },
      screens: {
        '-sm': {
          max: '639px'
        },
        '-md': {
          max: '767px'
        },
        '-lg': {
          max: '1023px'
        },
        '-xl': {
          max: '1279px'
        },
        '3xl': '1700px',
        '4xl': '1900px'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['var(--font-body)', ...defaultTheme.fontFamily.sans],
        header: ['var(--font-header)', ...defaultTheme.fontFamily.serif],
      },
      fontSize: {
        '0': '0',
        lg: '1.25rem',
        xl: '2rem',
        '2xl': ['2.25rem', '1'],
        '3xl': ['3rem', '1'],
        '3.5xl': ['3.5rem', '1'],
        '4xl': ['4rem', '1'],
        '4.5xl': ['5rem', '1'],
        '4.75xl': ['7rem', '1'],
        '5xl': ['8rem', '1'],
        '6xl': ['9rem', '1'],
        '7xl': ['12rem', '1'],
        '8xl': ['14rem', '1'],
        '9xl': ['18rem', '1'],
        'dmax': ['11lvw', '1']
      },
      letterSpacing: {
        wide: '0.17em',
        widest: '0.19em',
      },
      lineHeight: {
        '0': '0',
        'over-loose': '0.9'
      },
      textUnderlineOffset: {
        3: '3px',
        neg1: '-1px'
      },
      height: {
        'half': '50vh',
        'twoThirds': '66.66667vh',
        'oneThird': '33.33337vh',
        'infinite': '9999px',
      },
      minHeight: {
        'half': '50vh',
        'twoThirds': '66.66667vh'
      },
      width: {
        'half': '50vw',
        'halfFullPx': 'round(up, 50vw, 2px)',
        'twoThirds': '66.66667vw'
      },
      maxWidth: {
        '1/2': '50%',
        '1/3': '33.33337%',
        '2/3': '66.66667%',
        'screen': '100vw',
        'screen-sm': '640px',
        'screen-md': '768px'
      },
      zIndex: {
        '1': '1',
        '2': '2',
        rightNav: '30',
        header: '500',
        max: '1000'
      },
      spacing: {
        full: '100%',
        screen: '100vh',
        '18': '4.5rem'
      },
      aspectRatio: {
        '4/3': '4 / 3'
      },
      borderRadius: {
        '1/3': '33.3333%',
        '20': '5rem',
        '60': '15rem',
        'responsibilities': '12.375rem',
      },
      rotate: {
        '33': '33.33333deg',
        '66': '66.66667deg',
      },
    },
  },
  separator: '_',
  plugins: [],
};
export default config;
