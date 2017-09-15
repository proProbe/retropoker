import { createStore, applyMiddleware, compose, combineReducers, Reducer } from "redux";
import { TBoardState, boardReducer } from "./board/reducer";

const isDev = process.env.NODE_ENV === "development";

export type RootState = {
  board: TBoardState,
};

const rootReducer: Reducer<RootState> = combineReducers({
  board: boardReducer,
});

const configureStore = (initialState?: RootState) => {
  // compose enhancers
  const enhancer = isDev
    ? compose()
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
