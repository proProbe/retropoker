const WebpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
const config = require("../webpack.config");
const env = require("./env");
const path = require("path");

require("./prepare");

const options = (config.chromeExtensionBoilerplate || {});
const excludeEntriesToHotReload = (options.notHotReload || []);

for (const entryName in config.entry) {
  if (excludeEntriesToHotReload.indexOf(entryName) === -1) {
    config.entry[entryName] =
      [
        ("webpack-dev-server/client?http://localhost:" + env.PORT),
        "webpack/hot/dev-server",
      ].concat(config.entry[entryName]);
  }
}

config.plugins =
  [new webpack.HotModuleReplacementPlugin()].concat(config.plugins || []);

delete config.chromeExtensionBoilerplate;

const compiler = webpack(config);

const server =
  new WebpackDevServer(compiler, {
    hot: true,
    contentBase: path.join(__dirname, "../build"),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
    },
  });

server.listen(env.PORT, "localhost", (err, res) => {
  if(err) {
    return console.log(err);
  }

  console.log(`Listening at http://localhost:${env.PORT}/`)
});
