const webpack = require("webpack");
const path = require("path");
const fileSystem = require("fs");
const env = require("./utils/env");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
const StatsPlugin = require("stats-webpack-plugin");

// load the secrets
const alias = {};
const secretsPath = path.join(__dirname, `secrets.${env.NODE_ENV}.js`);
if (fileSystem.existsSync(secretsPath)) {
  alias.secrets = secretsPath;
}

const options = {
  name: "Web",
  devtool: "source-map",
  entry: {
    index: path.join(__dirname, "src", "index.tsx")
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name]-[hash].bundle.js",
    publicPath: "/"
  },
  resolve: {
    alias: alias,
    extensions: [".js", ".jsx", ".css", ".tsx", ".json"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
      filename: "index.html",
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    }),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify(env.NODE_ENV)
      }
    }),
    new WriteFilePlugin(),
  ],
  module: {
    rules: [
      { test: /\.css$/, loader: "style-loader!css-loader", exclude: /node_modules/ },
      { test: /\.tsx?$/, loaders: ["babel-loader", "awesome-typescript-loader"]},
      { test: /\.json?$/, loader: "json"},
    ],
  },
};

module.exports = options;
