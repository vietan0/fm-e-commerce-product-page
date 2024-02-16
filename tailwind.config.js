import { nextui } from '@nextui-org/theme';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/components/popover.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Kumbh Sans', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        lightbox: 'hsl(0 0% 0% / 75%)',
        orange: 'hsl(26, 100%, 55%)',
        'pale-orange': 'hsl(25, 100%, 94%)',
        'grey-blue-98': 'hsl(223, 64%, 98%)',
        'grey-blue-93': 'hsl(223, 34%, 93%)',
        'grey-blue-75': 'hsl(220, 14%, 75%)',
        'grey-blue-50': 'hsl(219, 9%, 45%)',
        'grey-blue-10': 'hsl(220, 23%, 15%)',
      },
      screens: {
        xs: '400px',
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [nextui()],
};
