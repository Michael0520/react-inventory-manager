const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/main.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js|jsx$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".jsx", ".js", ".ts"],
    alias: {
      "@": resolve(__dirname, "src"),
    },
    preferRelative: true,
  },
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
  devServer: {
    port: 3333,
    open: true,
  },
};
