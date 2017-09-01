const webpack = require("webpack");
const config = require("../webpack.config");

require("./prepare");

delete config.chromeExtensionBoilerplate;

webpack(
  config,
  (err) => { if (err) throw err; }
);
