import { Epic, ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import { TErrorAction } from "../errorHandler/reducer";
import * as errorHandler from "../errorHandler/actions";
import { Action } from "redux";

export const PING = "PING";
export type PING_ACTION = {
  type: typeof PING,
};

export type TPingActions = PING_ACTION;

export const actionCreators = {
  ping: (): PING_ACTION => ({type: PING}),
};

export default (action$: ActionsObservable<TPingActions>): Observable<TPingActions | TErrorAction> =>
  action$.ofType("PING")
    .delay(1000) // Asynchronously wait 1000ms then continue
    .mapTo(errorHandler.actionCreators.throwError({ message: "hello", type: "warning" }));
