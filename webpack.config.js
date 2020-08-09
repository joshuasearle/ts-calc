const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  // Add build files to folder build, and put all js into bundle.js
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  // For hot reloading in dev mode
  watchOptions: {
    poll: true,
    ignored: /node_modules/
  },
  // To load the ts files
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  // To automatically add index.html to bulid folder
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  // Files types we load
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  }
}
