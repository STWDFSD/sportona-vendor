/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        custom:
          '0 4px 6px rgba(198, 182, 247, 0.3), 0 4px 6px rgba(231, 153, 250, 0.3)',
        custom2:
          '0 4px 6px rgba(244, 166, 127, 0.3), 0 4px 6px rgba(233, 251, 32, 0.3)',
      },
      colors: {
        primary: '#121217',
        secondary: '#6C6C89',
        'white-32': 'rgba(255, 255, 255, 0.32)',
        'white-56': 'rgba(255, 255, 255, 0.56)',
      },
      transitionProperty: {
        width: 'width',
      },
      screens: {
        xs: '100px',
      },
    },
  },
  plugins: [],
};
