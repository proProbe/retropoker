import { createStore, applyMiddleware, compose, combineReducers, Reducer } from "redux";
import { createEpicMiddleware } from "redux-observable";
import logger from "redux-logger";
import { boardReducer } from "./board/reducer";
import { TBoard } from "../components/board/board.types";
import { errorHandlerReducer, TErrorHandlerState } from "./errorHandler/reducer";
import rootEpic from "./epics/index";

const isDev = process.env.NODE_ENV === "development";

export type RootState = {
  board: TBoard,
  errorHandler: TErrorHandlerState,
};

const rootReducer: Reducer<RootState> = combineReducers({
  board: boardReducer,
  errorHandler: errorHandlerReducer,
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
