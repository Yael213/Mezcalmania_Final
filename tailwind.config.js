/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      xm: '0.6rem',
      sm2: '0.7rem',
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '2.5xl': '1.690rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
      '9xl': '8rem',
      '3.5xl': '2.125rem',
      '3.75xl': '2.225rem',
    },
    extend: {
      height: {
        '128': '32rem',
        '6/10': '60%;',
        '7/10': '70%;',
        '8/10': '80%;',
        '9/10': '90%;'
      },
      maxWidth: {
        '6/10': '60%;',
        '7/10': '70%;',
        '8/10': '80%;',
        '9/10': '90%;'
      },
      maxHeight: {
        'xs': '20rem',
        'sm': '24rem',
        'md': '28rem',
        'lg': '32rem',
        'xl': '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem',
        '6/10': '60%;',
        '7/10': '70%;',
        '8/10': '80%;',
        '9/10': '90%;',
        '9.5/10': '95%;'
      },
      width: {
        '22': '88px',
        '128': '32rem',
        '6/10': '60%;',
        '7/10': '70%;',
        '8/10': '80%;',
        '9/10': '90%;'
      },
      backgroundImage: theme => ({
        'mezcal-pattern': "url('/Images/pattern.jpg')",
                }),
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      translate: {
        '1/10': '10%',
        '1/20': '5%',
        '1/40': '4%',
      },
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
        '10': '10px',
        '12': '12px'
      },
      spacing: {
        '18': '4.25rem',
        '36': '9rem',
        '28': '7.3rem',
        '75.5': '18.5rem',
        '76': '19rem'
      },
      colors: {
        'deep-violet': '#0F0008',
        'cool-orange': '#F79E22',
        'nice-pink': '#A21037',
        'less-pink': '#A33B57',
        'title-v': '#790C26',
        'sub-salmon': '#BC372E',
        'nosotras-green': '#0F812F',
        'hover-green': '#08481A',
        'eventos-mint': '#2EBC84',
        'hover-mint': '#1F7251',
        'galeria-red': '#E33136',
        'hover-red': '#991B1E',
        'productos-violet': '#A21037',
        'hover-violet': '#60001A',
        'carrito-orange': '#E96C37',
        'hover-orange': '#96421E',
        'contacto-yellow': '#BCA62F',
        'hover-yellow': '#827321',
        'contactoVerde': '#0A5741',
        'contactoVerdeClic': '#073C2C',
        'contactoRosa': '#8F265E',
        'btn': '#1D0B14',
        'btn2': '#BC372E',
        'data-cherry' : {
          900: '#7B0546',
          888: '#790344',
          950: '#240014',
          860: '#512249',
          850: '#1D0B14',
          800: '#4E002B',
          500: '#7F0147',
          400: '#370D23',
        },
        'data-yellow' : {
          200: '#F0D751',
          300: '#F79E22',
        },
        'data-pink' : {
          200: '#FFD9EB',
        },
        'data-purple' : {
          200: '#B191A2',
        
        },
      },
      fontFamily: {
        bung: ['Bungee'],
        jom: ['Jomhuria'],
        sans: ['var(--font-inter)'],
        roboto: ['Roboto'],
        outfit: ['Outfit',],
        bungee: ['Bungee Inline'],
        acueducto:['Outfit']
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}