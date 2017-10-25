const express = require("express");
const WebSocket = require("ws");
const _ = require("lodash");

const isDev = process.env.NODE_ENV !== "production";
const port = isDev ? 3001 : process.env.PORT;
const app = express();
if (!isDev) {
  app.use(express.static("build"));
}
const server = app.listen(port, "0.0.0.0", (err, res) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Environment: ${process.env.NODE_ENV}`)
  console.log(`Listening on port ${port}`);
});

let webSockets = {};
let users = [];
let board = {
  state: "hidden",
  cards: [],
}

const handleWSMessages = (wss, ws, req, msg) => {
  console.log(msg);
  switch (msg.type) {
    case "SOCKET_CHANGE_BOARD_STATE": {
      board.state = msg.boardState;
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({type: "CHANGE_BOARD_STATE", state: board.state}));
        }
      });
      break;
    }
    case "SOCKET_GET_BOARD_STATE": {
      ws.send(JSON.stringify({
        type: "INIT_BOARD",
        board: {
          ...board,
          users: [...Object.values(webSockets)],
        },
      }));
      break;
    }
    case "SOCKET_ADD_CARD_COLUMN": {
      const data = {
        columnId: msg.columnId,
        card: {
          ...msg.card,
          id: _.uniqueId("card"),
        }
      }
      board.cards = [...board.cards, data];
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            type: "ADD_CARD_TO_COLUMN",
            ...data
          }));
        }
      });
      break;
    }
    case "SOCKET_CHANGE_CARD": {
      const data = {
        card: msg.card
      }
      board.cards = board.cards.map((card) => {
        if (card.card.id === data.card.id) {
          return {
            ...card,
            card: data.card
          }
        }
        return card;
      });
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            type: "CHANGE_CARD",
            ...data
          }));
        }
      });
      break;
    }
    case "SOCKET_MOBILE_SHOW_CARD": {
      const data = {
        card: msg.card
      }
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            type: "MOBILE_SHOW_CARD",
            ...data
          }));
        }
      });
      break;
    }
    case "SOCKET_LIVE_CHANGE_CARD": {
      const data = {
        card: msg.card
      }
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            type: "MOBILE_SHOW_CARD",
            ...data
          }));
        }
      });
      break;
    }
    case "SOCKET_USER_JOIN": {
      webSockets[ws.id] = msg.user.user;
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            type: "INIT_BOARD",
            board: {
              ...board,
              users: [...Object.values(webSockets)],
            },
          }));
        }
      });
      break;
    }
    default:
      console.log("Something else called", msg.type);
      break;
  }
}

const wss = new WebSocket.Server({server: server});
wss.on("connection", (ws, req) => {
  ws.id = _.uniqueId();
  ws.send(JSON.stringify({
    type: "INIT_BOARD",
    board: {
      ...board,
      users: [...Object.values(webSockets)],
    }
  }));
  ws.on("message", (msg) => {
    handleWSMessages(wss, ws, req, JSON.parse(msg));
  });
  ws.on("close", () => {
    delete webSockets[ws.id];
    console.log(...Object.values(webSockets));
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: "INIT_BOARD",
          board: {
            ...board,
            users: [...Object.values(webSockets)],
          },
        }));
      }
    });
  });
});
