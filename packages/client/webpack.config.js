import path from "path";
import Dotenv from "dotenv-webpack";

module.exports = {
  // webpack optimization mode
  mode: "development" === process.env.NODE_ENV ? "development" : "production",

  watch: "development" === process.env.NODE_ENV,

  // entry files
  entry: "./src/index.ts",

  // output files and chunks
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    libraryTarget: "umd",
    library: "@hypecharms/client",
    umdNamedDefine: true,
  },

  // module/loaders configuration
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
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
    extensions: [".js", ".jsx", ".ts", ".tsx"],
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

  // generate source map
  devtool: "source-map",
};