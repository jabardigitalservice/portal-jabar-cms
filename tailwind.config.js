module.exports = {
  content: ['./src/**/*.vue'],
  theme: {
    extend: {
      gridTemplateColumns: {
        layout: 'minmax(260px, 15%) 1fr',
      },
      backgroundImage: {
        hero: "radial-gradient(100% 820.78% at 0% 0%, rgba(0, 39, 39, 0.9) 0%, rgba(0, 24, 11, 0.96) 76.87%), url('~@/assets/images/hero.webp')",
        pattern: "url('~@/assets/images/pattern.svg')",
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        lora: ['Lora', 'serif'],
      },
      colors: {
        green: {
          50: '#E6F6EC',
          100: '#C3E9D0',
          200: '#9BDBB3',
          300: '#70CD94',
          400: '#4DC27E',
          500: '#1FB767',
          600: '#16A75C',
          700: '#069550',
          800: '#008444',
          900: '#006430',
        },
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
        'blue-gray': {
          50: '#E3E7ED',
          100: '#B9C3D3',
          200: '#8D9DB5',
          300: '#627798',
          400: '#415C84',
          500: '#1A4373',
          600: '#133C6B',
          700: '#083461',
          800: '#022B55',
          900: '#001B3D',
        },
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(200%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-200%)', opacity: '0.5' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'close-to-top': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-200%)', opacity: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '0.5' },
        },
      },
      animation: {
        'slide-up': 'slide-up 300ms cubic-bezier(0,.89,.47,1.01)',
        'slide-down': 'slide-down 350ms cubic-bezier(0,.89,.47,1.01)',
        'fade-in': 'fade-in 400ms cubic-bezier(.11,.64,.43,.98)',
        'close-to-top': 'close-to-top 350ms cubic-bezier(0,.89,.47,1.01)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
};
