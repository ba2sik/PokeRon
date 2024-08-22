/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'all-sides': '0 0 20px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
