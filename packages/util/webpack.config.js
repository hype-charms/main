/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const dotenv = require("dotenv-webpack");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  // webpack optimization mode
  mode: "development" === process.env.NODE_ENV ? "development" : "production",

  watch: "development" === process.env.NODE_ENV,

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
    new dotenv(),
    new CopyPlugin({
      patterns: [{ from: 'prisma/schema.prisma', to: 'dist/prisma/schema.prisma' }],
    }),
  ],

  // resolve files configuration
  resolve: {
    // file extensions
    extensions: [".js", ".jsx"],
    fallback: {
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      "url": require.resolve("url/"),
      "buffer": require.resolve("buffer/"),
      "assert": require.resolve("assert/"),
      dns: false,
      net: false,
      tls: false
    }
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
