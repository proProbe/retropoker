import "rxjs";
import { combineEpics, ActionsObservable } from "redux-observable";
// tslint:disable-next-line
import { Observable } from "rxjs";
import { WebSocket } from "mock-socket";
import { MiddlewareAPI } from "redux";
import {RootState, RootAction} from "../store";
import { TCard } from "../../components/card/card.types";
import { TBoardState } from "../../components/board/board.types";

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

type TSocketActions
  = SOCKET_ADD_CARD_ACTION
  | SOCKET_CARD_SUB_ACTION
  | SOCKET_CHANGE_BOARD_STATE_ACTION
  | SOCKET_ADD_CARD_COLUMN_ACTION;

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
};

const wsPath = "ws://localhost:3000";
export const socket$ = Observable.webSocket({
  url: wsPath,
});


const wsEpic =
  (action$: ActionsObservable<TSocketActions>, store: MiddlewareAPI<RootState>): Observable<TActions> =>
    action$.ofType(SOCKET_CARD_SUB)
      .mergeMap((action: TSocketActions) =>
        socket$
          .filter((serverAction: RootAction) => [
              "ADD_CARD_TO_COLUMN",
              "INIT_BOARD",
              "CHANGE_BOARD_STATE",
            ].includes(serverAction.type))
          .map((serverAction: RootAction) => serverAction),
      );

const wsActionsEpic =
  (action$: ActionsObservable<TSocketActions>, store: MiddlewareAPI<RootState>): Observable<TActions> =>
    action$.ofType(
      SOCKET_ADD_CARD_COLUMN,
      SOCKET_CHANGE_BOARD_STATE,
    )
    .map((action: TSocketActions) => socket$.next(JSON.stringify(action)))
    .mapTo({type: "NOOP"} as RootAction);

const rootEpic = combineEpics(
  wsEpic,
  wsActionsEpic,
);
export default rootEpic;
