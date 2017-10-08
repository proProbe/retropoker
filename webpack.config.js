const webpack = require("webpack");
const path = require("path");
const fileSystem = require("fs");
const env = require("./utils/env");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
const prepare = require("./utils/prepare");

// prepare.clearDist();

// load the secrets
const alias = {};
const secretsPath = path.join(__dirname, `secrets.${env.NODE_ENV}.js`);
if (fileSystem.existsSync(secretsPath)) {
  alias.secrets = secretsPath;
}

const options = {
  name: "Web",
  devtool: "eval-source-map",
  devServer: {
    historyApiFallback: true
  },
  entry: {
    index: [
      "webpack-hot-middleware/client?reload=true",
      path.join(__dirname, "src", "client", "index.tsx")
    ]
  },
  output: {
    path: path.join(__dirname, "dist", "client"),
    filename: "[name].bundle.js",
    publicPath: "/"
  },
  resolve: {
    alias: alias,
    extensions: [".js", ".jsx", ".css", ".tsx", ".json", ".ts"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "client", "index.html"),
      filename: "index.html",
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify(env.NODE_ENV),
        "PORT": JSON.stringify(env.PORT),
        "WS": JSON.stringify(env.WS)
      }
    }),
    new WriteFilePlugin(),
  ],
  module: {
    rules: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test   : /\.(ttf|eot|svg|png|woff(2)?)(\?[a-z0-9=&.]+)?$/, loader : 'file-loader' },
      { test: /\.tsx?$/, loaders: ["babel-loader", "awesome-typescript-loader"]},
      { test: /\.js$/, loader: "source-map-loader", enforce: "pre"},
      { test: /\.json?$/, loader: "json"},
    ],
  },
};

module.exports = options;
