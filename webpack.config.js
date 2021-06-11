const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack  = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public/javascripts')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../stylesheets/main.css'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    })
  ],
  module: {
      rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults'}]
            ]
          }
        }
      },
      {
        test: /\.(sc|c)ss$/,
        use: [
            MiniCssExtractPlugin.loader, //this plugin allow us to create css file instead of inserting a style tag
            'css-loader', 
            'postcss-loader', //postcss looks automatically for a config file, as well as babel
            'sass-loader',
          ],
      },
    ],
  },
  devtool: "source-map",
}