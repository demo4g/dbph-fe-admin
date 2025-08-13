module.exports = {
  plugins: {
    'postcss-preset-mantine': {
      autoRem: true,
    },
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '30',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '64em',
        'mantine-breakpoint-lg': '74em',
        'mantine-breakpoint-xl': '90em',
        'mantine-breakpoint-xxl': '100em',
      },
    },
  },
};
