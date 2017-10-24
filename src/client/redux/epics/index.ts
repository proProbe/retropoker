import "rxjs";
import { combineEpics, ActionsObservable } from "redux-observable";
// tslint:disable-next-line
import { Observable, Subject } from "rxjs";
import { MiddlewareAPI } from "redux";
import { RootState, RootAction } from "../store";
import { TCard } from "../../views/desktop/card/card.types";
import { TBoardState } from "../../views/desktop/board/board.types";

export const SOCKET_ADD_CARD = "SOCKET_ADD_CARD";
export type SOCKET_ADD_CARD_ACTION = {
  type: typeof SOCKET_ADD_CARD,
};

export const SOCKET_CARD_SUB = "SOCKET_CARD_SUB";
export type SOCKET_CARD_SUB_ACTION = {
  type: typeof SOCKET_CARD_SUB,
};
export const SOCKET_ADD_CARD_COLUMN = "SOCKET_ADD_CARD_COLUMN";
export type SOCKET_ADD_CARD_COLUMN_ACTION = {
  type: typeof SOCKET_ADD_CARD_COLUMN,
  columnId: string,
  card: TCard,
};
export const SOCKET_CHANGE_BOARD_STATE = "SOCKET_CHANGE_BOARD_STATE";
export type SOCKET_CHANGE_BOARD_STATE_ACTION = {
  type: typeof SOCKET_CHANGE_BOARD_STATE,
  boardState: TBoardState,
};
export const SOCKET_CHANGE_CARD = "SOCKET_CHANGE_CARD";
export type SOCKET_CHANGE_CARD_ACTION = {
  type: typeof SOCKET_CHANGE_CARD,
  card: TCard,
};
export const SOCKET_LIVE_CHANGE_CARD = "SOCKET_LIVE_CHANGE_CARD";
export type SOCKET_LIVE_CHANGE_CARD_ACTION = {
  type: typeof SOCKET_LIVE_CHANGE_CARD,
  card: TCard,
};
export const SOCKET_MOBILE_SHOW_CARD = "SOCKET_MOBILE_SHOW_CARD";
export type SOCKET_MOBILE_SHOW_CARD_ACTION = {
  type: typeof SOCKET_MOBILE_SHOW_CARD,
  card: TCard,
};

type TSocketActions
  = SOCKET_ADD_CARD_ACTION
  | SOCKET_CARD_SUB_ACTION
  | SOCKET_CHANGE_BOARD_STATE_ACTION
  | SOCKET_CHANGE_CARD_ACTION
  | SOCKET_LIVE_CHANGE_CARD_ACTION
  | SOCKET_ADD_CARD_COLUMN_ACTION
  | SOCKET_MOBILE_SHOW_CARD_ACTION;

type TActions = TSocketActions | RootAction;

export const actionCreators = {
  socketAddCard: (): SOCKET_ADD_CARD_ACTION => ({type: SOCKET_ADD_CARD}),
  socketCardSub: (): SOCKET_CARD_SUB_ACTION => ({type: SOCKET_CARD_SUB}),
  socketAddCardToColumn: (columnId: string, card: TCard): SOCKET_ADD_CARD_COLUMN_ACTION => ({
    type: SOCKET_ADD_CARD_COLUMN,
    columnId: columnId,
    card: card,
  }),
  socketChangeBoardState: (boardState: TBoardState): SOCKET_CHANGE_BOARD_STATE_ACTION => ({
    type: SOCKET_CHANGE_BOARD_STATE,
    boardState: boardState,
  }),
  socketChangeCard: (card: TCard): SOCKET_CHANGE_CARD_ACTION => ({
    type: SOCKET_CHANGE_CARD,
    card: card,
  }),
  socketMobileShowCard: (card: TCard): SOCKET_MOBILE_SHOW_CARD_ACTION => ({
    type: SOCKET_MOBILE_SHOW_CARD,
    card: card,
  }),
  socketLiveChangeCard: (card: TCard): SOCKET_LIVE_CHANGE_CARD_ACTION => ({
    type: SOCKET_LIVE_CHANGE_CARD,
    card: card,
  }),
};

const openSubject = new Subject();
const wsPath = process.env.WS_PATH || "ws://localhost:3000/socket";
export const socket$ = Observable.webSocket({
  url: wsPath,
  openObserver: openSubject,
  closeObserver: { next: (val: any) => console.info("closing", val)},
});

const wsEpic =
  (action$: ActionsObservable<TSocketActions>, store: MiddlewareAPI<RootState>): Observable<TActions> =>
    action$.ofType(SOCKET_CARD_SUB)
      .mergeMap((action: TSocketActions) =>
        socket$
          .retry(20)
          // .takeUntil(
          // action$.ofType("CLOSE_TICKER_STREAM")
          //   .filter(closeAction => closeAction.ticker === action.ticker),
          // )
          .filter((serverAction: RootAction) => [
              "ADD_CARD_TO_COLUMN",
              "INIT_BOARD",
              "CHANGE_BOARD_STATE",
              "CHANGE_CARD",
              "MOBILE_SHOW_CARD",
            ].includes(serverAction.type))
          .map((serverAction: RootAction) => serverAction)
          .catch((error) => {
            const errorAction: RootAction = {type: "THROW_ERROR", error: { message: "error", type: "error"}};
            return Observable.of(errorAction);
          }),
      );

const wsActionsEpic =
  (action$: ActionsObservable<TSocketActions>, store: MiddlewareAPI<RootState>): Observable<TActions> =>
    action$.ofType(
      SOCKET_ADD_CARD_COLUMN,
      SOCKET_CHANGE_BOARD_STATE,
      SOCKET_CHANGE_CARD,
      SOCKET_MOBILE_SHOW_CARD,
    )
    .map((action: TSocketActions) => socket$.next(JSON.stringify(action)))
    .mapTo({type: "NOOP"} as RootAction);

const wsLiveEpic =
  (action$: ActionsObservable<TSocketActions>, store: MiddlewareAPI<RootState>): Observable<TActions> =>
    action$.ofType(
      SOCKET_LIVE_CHANGE_CARD,
    )
    .debounceTime(250)
    .map((action: TSocketActions) => socket$.next(JSON.stringify(action)))
    .mapTo({type: "NOOP"} as RootAction);

const testEpic =
  (action$: ActionsObservable<TSocketActions>, store: MiddlewareAPI<RootState>): Observable<TActions> =>
  action$.ofType(SOCKET_CARD_SUB)
    .switchMap((action: TSocketActions) =>
      openSubject
        .mapTo(socket$.next(JSON.stringify({
          type: "SOCKET_USER_JOIN",
          user: store.getState().user,
        }))),
    ).mapTo({type: "NOOP"} as RootAction);

const rootEpic = combineEpics(
  wsEpic,
  wsActionsEpic,
  wsLiveEpic,
  testEpic,
);
export default rootEpic;
