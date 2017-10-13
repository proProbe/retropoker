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
  console.log(`Listening on port ${port}`);
});

let board = {
  state: "hidden",
  cards: [],
}

const handleWSMessages = (wss, ws, msg) => {
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
      ws.send(JSON.stringify({type: "INIT_BOARD", board: board}));
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
        console.log(card.card, data.card);
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
    default:
      console.log("Something else called", msg.type);
      break;
  }
}

const wss = new WebSocket.Server({server: server});
wss.on("connection", (ws, req) => {
  ws.send(JSON.stringify({type: "INIT_BOARD", board: board}));
  ws.on("message", (msg) => {
    handleWSMessages(wss, ws, JSON.parse(msg));
  });
});
