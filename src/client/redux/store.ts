import { createStore, applyMiddleware, compose, combineReducers, Reducer } from "redux";
import { boardReducer } from "./board/reducer";
import logger from "redux-logger";
import { TBoard } from "../components/board/board.types";

const isDev = process.env.NODE_ENV === "development";

export type RootState = {
  board: TBoard,
};

const rootReducer: Reducer<RootState> = combineReducers({
  board: boardReducer,
});

const configureStore = (initialState?: RootState) => {
  // compose enhancers
  const enhancer = isDev
    ? compose(
      applyMiddleware(logger),
    )
    : compose();

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
