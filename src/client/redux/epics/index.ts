import "rxjs";
import { combineEpics } from "redux-observable";
// tslint:disable-next-line
import { Observable } from "rxjs";
import { WebSocket } from "mock-socket";

import ping from "./ping";

export const addTicker = (ticker: any) => ({ type: "ADD_TICKER", ticker });
export const removeTicker = (ticker: any) => ({ type: "REMOVE_TICKER", ticker });

const wsPath = "ws://localhost:8080";
const socket$ = Observable.webSocket({
  url: wsPath,
  // use mock WebSocket, not needed unless you mock too
  WebSocketCtor: WebSocket,
});
// tslint:disable
const stockTickerEpic = (action$: any, store: any) =>
  action$.ofType('ADD_TICKER')
    .mergeMap((action: any) =>
      socket$.multiplex(
        () => ({
          type: 'subscribe',
          ticker: action.ticker
        }),
        () => ({
          type: 'unsubscribe',
          ticker: action.ticker
        }),
        (msg: any) => msg.ticker === action.ticker
      )
      .retryWhen(err => {
        if (window.navigator.onLine) {
          return Observable.timer(1000);
        } else {
          return Observable.fromEvent(window, 'online');
        }
      })
      .takeUntil(
        action$.ofType('REMOVE_TICKER')
          .filter((closeAction: any) => closeAction.ticker === action.ticker)
      )
      .map(tick => ({
        type: "TICKER_TICK",
        ticker: tick.ticker,
        value: tick.value,
      })),
    );

const rootEpic = combineEpics(
  ping,
  stockTickerEpic,
);
export default rootEpic;
