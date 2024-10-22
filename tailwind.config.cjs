module.exports = {
  content: ['./index.html', './src/**/*.{html,js,ts,svelte}'],
  theme: {
    fontFamily: {
      sans: ['Inter'],
    },
    extend: {
      colors: {
        dark: {
          primary: '#000000',
          'surface-1': '#1a1a1a',
          'surface-2': '#2c2c2c',
          red: '#ff6666',
          green: '#66ff67',
          blue: '#66ffff',
          yellow: '#ffff66',
        },
        light: {
          primary: '#ffffff',
          'surface-1': '#ebebeb',
          'surface-2': '#ececec',
          red: '#e50000',
          green: '#00cc01',
          blue: '#00cccc',
          yellow: '#dbb700',
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
