/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const Dotenv = require("dotenv-webpack");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  // webpack optimization mode
  mode: "development" === process.env.NODE_ENV ? "development" : "production",

  watch: true,

  // entry files
  entry: "./dist/index.js",

  // output files and chunks
  output: {
    path: path.resolve(__dirname, "./"),
    filename: ".build/[name].js",
  },

  // module/loaders configuration
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },

  // webpack plugins
  plugins: [
    new Dotenv(),
  ],

  // resolve files configuration
  resolve: {
    // file extensions
    extensions: [".js", ".jsx"],
  },

  // webpack optimizations
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,

        vendor: {
          chunks: "all", // both : consider sync + async chunks for evaluation
          name: "vendor", // name of chunk file
          test: /node_modules/, // test regular expression
        },
      },
    },
  },
  // development server configuration
  devServer: {
    port: 4000,
    historyApiFallback: true,
  },

  // generate source map
  devtool: "source-map",
};
