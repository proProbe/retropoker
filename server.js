const express = require("express");
const path = require("path");
const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

const isDev = process.env.NODE_ENV !== "production";
const webpackPath = isDev ? "./webpack.config.js" : "./webpack.production.config.js";
const config = require(webpackPath);
const port = isDev ? 3000 : process.env.PORT;

const app = express();

if (isDev) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: "src",
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get("*", (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, "dist/index.html")));
    res.end();
  });
} else {
  app.use(express.static(path.join(__dirname, "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"));
  });
}

app.listen(port, "localhost", (err, res) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Listening on port ${port}`);
});

