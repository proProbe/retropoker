import { createStore, applyMiddleware, compose, combineReducers, Reducer } from "redux";
import { createEpicMiddleware } from "redux-observable";
import logger from "redux-logger";
import { boardReducer } from "./board/reducer";
import { TBoardAction } from "./board/types";
import { TBoard } from "../views/desktop/board/board.types";
import { errorHandlerReducer } from "./errorHandler/reducer";
import { TErrorHandlerState, TErrorAction } from "./errorHandler/types";
import { userReducer } from "./user/reducer";
import { TUserState, TUserAction } from "./user/types";
import { TShowingCardState, TShowingCardAction } from "./mobile/types";
import { mobileShowingCardReducer } from "./mobile/reducer";
import rootEpic from "./epics/index";

const isDev = process.env.NODE_ENV === "development";

export type RootState = {
  board: TBoard,
  errorHandler: TErrorHandlerState,
  user: TUserState,
  mobile: TShowingCardState,
};

export type RootAction
  = TBoardAction
  | TErrorAction
  | TUserAction
  | TShowingCardAction
  | {type: "NOOP"};

const rootReducer: Reducer<RootState> = combineReducers({
  board: boardReducer,
  errorHandler: errorHandlerReducer,
  user: userReducer,
  mobile: mobileShowingCardReducer,
});

const epicMiddleware = createEpicMiddleware(rootEpic);
const configureStore = (initialState?: RootState) => {
  // compose enhancers
  const enhancer = isDev
    ? compose(
      applyMiddleware(
        logger,
        epicMiddleware,
      ),
    )
    : compose(
        applyMiddleware(
          epicMiddleware,
        ),
    );

  // create store
  return createStore<RootState>(
    rootReducer,
    initialState!,
    enhancer,
  );
};

// pass an optional param to rehydrate state on app start
const store = configureStore();

// export store singleton instance
export default store;
