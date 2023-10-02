const path = require('path');

module.exports = [
  {
    entry: './public/js/validation.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public/js')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    }
  }
];
