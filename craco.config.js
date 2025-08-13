const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';

const webpackPlugins = [];

module.exports = {
  webpack: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
    plugins: webpackPlugins,
  },

  // disabled console.log in production
  babel: {
    plugins: isProduction ? [['transform-remove-console', { exclude: ['error'] }]] : [],
  },
};
