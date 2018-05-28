const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const GoogleFontsPlugin = require("google-fonts-webpack-plugin");

const javascript = {
  test: /\.(js)$/,
  use: [{
    loader: 'babel-loader',
    options: { presets: ['env'] }
  }],
};

const postcss = {
  loader: 'postcss-loader',
  options: {
    plugins() {
      return [autoprefixer({ browsers: 'last 2 versions' })];
    }
  }
};

const styles = {
  test: /\.(scss)$/,
  use: ExtractTextPlugin.extract(
    ['css-loader', postcss, 'sass-loader']
  )
};

const uglify = new webpack.optimize.UglifyJsPlugin({
  compress: { warnings: false }
});

const config = {
  entry: {
    App: './public/javascripts/bit.js'
  },
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [javascript, styles]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new GoogleFontsPlugin({
			fonts: [
				{ family: "Medula One" },
				{ family: "Abel" }
			]
		})
  ]
};

module.exports = config;
