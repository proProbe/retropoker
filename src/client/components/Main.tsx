import React from "react";
import Board from "./board/board";
import ErrorModal from "./common/errorHandlers/modal/errorModal";
import { Server } from "mock-socket";
import { Observable } from "rxjs";

const mockServer = new Server(process.env.WS);
const tickerSubs: any = [];
setInterval(() => {
  if (tickerSubs.length > 0) {
    tickerSubs.forEach((ticker: any) => {
      const response = JSON.stringify({
        ticker,
        value: Math.floor(Math.random() * 100),
      });
      mockServer.send(response);
    });
  }
}, 1000);

mockServer.on("message", (msg: any) => {
  console.info(msg);
  switch (msg.type) {
    case "subscribe":
      if (!tickerSubs.includes(msg.ticker)) {
        tickerSubs.push(msg.ticker);
      }
      break;

    case "unsubscribe":
      const index = tickerSubs.indexOf(msg.ticker);
      if (index !== -1) {
        tickerSubs.splice(index, 1);
      }
      break;
  }
});
// end of fake WebSocket server
type TProps = { };
type TState = { };
class Main extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = this.initState();
  }

  private initState(): TState {
    return {};
  }

  public render(): JSX.Element {
    return (
      <div
        style={{
          backgroundColor: "blue",
          display: "flex",
          height: "100%",
          width: "100%",
        }}
      >
        <Board />
        <ErrorModal />
      </div>)
    ;
  }
}

export default Main;
