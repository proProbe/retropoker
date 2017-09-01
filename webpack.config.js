const webpack = require("webpack");
const path = require("path");
const fileSystem = require("fs");
const env = require("./utils/env");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");

// load the secrets
const alias = {};

const secretsPath = path.join(__dirname, `secrets.${env.NODE_ENV}.js`);

if (fileSystem.existsSync(secretsPath)) {
  alias.secrets = secretsPath;
}

const options = {
  entry: {
    index: path.join(__dirname, "src", "index.tsx"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      { test: /\.css$/, loader: "style-loader!css-loader", exclude: /node_modules/ },
      { test: /\.tsx?$/, loaders: ["babel-loader", "awesome-typescript-loader"]},
      { test: /\.js$/, loader: "source-map-loader", enforce: "pre"},
    ],
  },
  resolve: {
    alias: alias,
    extensions: [".js", ".jsx", ".css", ".tsx", ".json"],
  },
  plugins: [
    // expose and write the allowed env vars on the compiled bundle
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV),
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
      filename: "index.html",
      chunks: ["index"],
    }),
    new WriteFilePlugin(),
  ],
  // use externals if you include cdns and such in index.html
  // externals: {
  //   react: "React",
  //   "react-dom": "ReactDOM",
  // },
};

if (env.NODE_ENV === "development") {
  options.devtool = "cheap-module-eval-source-map";
}

module.exports = options;
