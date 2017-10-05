const express = require("express");
const WebSocket = require("ws");
const path = require("path");
const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require("../../webpack.config");
const util = require("util");

const isDev = process.env.NODE_ENV !== "production";
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
    // res.sendFile(path.join(__dirname, "dist/index.html"));
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, "dist", "client", "index.html")));
    res.end();
  });
} else {
  app.use(express.static(path.join(__dirname, "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"));
  });
}

const server = app.listen(port, "0.0.0.0", (err, res) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Listening on port ${port}`);
});

const cards = [{
  columnId: "3",
  card: {
    id: "new right",
    description: "this was here before!",
    status: "hidden",
  },
}];

const handleWSMessages = (wss, ws, msg) => {
  console.log(msg);
  switch (msg.type) {
    case "SOCKET_GET_BOARD_STATE":
      ws.send(JSON.stringify({type: "INIT_BOARD", board: {cards: cards}}));
    case "SOCKET_ADD_CARD_COLUMN":
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          const data = {
            columnId: msg.columnId,
            card: msg.card
          }
          cards.push(data);
          client.send(JSON.stringify({
            type: "ADD_CARD_TO_COLUMN",
            ...data
          }));
        }
      });
    default:
      console.log("Something else called", msg.type);
      break;
  }
}

const wss = new WebSocket.Server({server: server});
wss.on("connection", (ws, req) => {
  ws.send(JSON.stringify({type: "INIT_BOARD", board: {cards: cards}}));
  // ws.send(JSON.stringify({msg: "GOT IT"}));
  // console.log("connection", req);
  ws.on("message", (msg) => {
    handleWSMessages(wss, ws, JSON.parse(msg));
  });
});
