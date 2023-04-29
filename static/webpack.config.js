const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: {
      import: './dist/index.js',
      dependOn: 'react-vendors',
    },
    'react-vendors': ['react', 'react-dom']
  },
  mode: "development",
  output: {
    path: path.resolve(__dirname, `../server/dist/static`),
    filename: '[name].bundle.js',
    clean: true,
  },
  plugins: [new HtmlWebpackPlugin({
    template: './index.html',
  })],
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
    ],
  },
  devtool: 'inline-source-map',
};
