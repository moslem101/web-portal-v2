import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['BeVietnamPro', 'sans-serif'],
        bevietnam: ['BeVietnamPro', 'sans-serif'],
      },
      fontSize: {
        // Use Tailwind's default size names but override their values
        xs: ['10px', { lineHeight: '14px' }],
        sm: ['12px', { lineHeight: '16px' }],
        base: ['16px', { lineHeight: '20px' }],
        lg: ['20px', { lineHeight: '26px' }], // h4
        xl: ['24px', { lineHeight: '30px' }], // h3
        '2xl': ['32px', { lineHeight: '40px' }], // h2
        '3xl': ['40px', { lineHeight: '50px' }], // h1
        '4xl': ['60px', { lineHeight: '50px' }], // h1-large
        '5xl': ['72px', { lineHeight: '88px' }], // h1-xl
      },
      colors: {
        // Neutral colors
        neutral: {
          0: '#FFFFFF',
          100: '#E8E8E8', // 100
          200: '#D2D2D1', // 200
          300: '#BBBBB9', // 300
          400: '#A4A4A2', // 400
          500: '#8E8E8B', // 500
          600: '#777774', // 600
          700: '#5F5F5D', // 700
          800: '#414141', // 800
          900: '#30302F', // 900
        },

        // Primary / Brand colors
        primary: {
          100: '#FFF2CC', // Surface
          200: '#FFE699', // Border
          300: '#FFD966', // Main lighter
          400: '#FFCC33', // Main light
          500: '#FFC100', // Main
          600: '#CC9900', // Hover light
          700: '#997400', // Hover
          800: '#664D00 ', // Pressed
          900: '#332700',
        },

        // Secondary / Brand colors
        secondary: {
          100: '#FEFCE5', // Surface
          200: '#FFF8CC', // Border
          300: '#FFF5B3', // Main lighter
          400: '#FFF094', // Main light
          500: '#FFED7C', // Main
          600: '#FFE32E', // Hover light
          700: '#E6C700', // Hover
          800: '#998500 ', // Pressed
          900: '#4D4200',
        },

        // Success colors
        success: {
          100: '#BDFFEA', // Surface
          200: '#80FFD7', // Border
          500: '#00B97D', // Main
          700: '#00704E', // Hover
          800: '#004D34', // Pressed
        },

        // Error colors
        error: {
          100: '#FCCFD7', // Surface
          200: '#F99FB0', // Border
          500: '#F0143E', // Main
          600: '#C50C2E', // Hover
          700: '#950823', // Pressed
        },

        // Warning colors
        warning: {
          100: '#FCF2CF', // Surface
          200: '#FAE7A3', // Border
          500: '#F2C417', // Main
          600: '#CAA10C', // Hover
          700: '#96770A', // Pressed
        },

        // Info colors
        info: {
          100: '#C8E4F8', // Surface
          200: '#8EC8F1', // Border
          500: '#156DAD', // Main
          700: '#0D4269', // Hover
          800: '#092B44', // Pressed
        },

        // Add background and surface colors for light/dark modes
        background: {
          DEFAULT: '#FFFFFF',
        },
        surface: {
          DEFAULT: '#FFFFFF',
        },

        // Add border colors
        border: {
          DEFAULT: '#E5E5E5',
        },
      },
    },
  },
  plugins: [],
}

export default config
