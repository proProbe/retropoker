import { TColumn } from "../../components/column/column.types";
import {
  ADD_CARD_TO_COLUMN,
  ADD_CARD_TO_COLUMN_ACTION,
} from "./actions";

type BoardAction = ADD_CARD_TO_COLUMN_ACTION;

export type TBoardState = {
  columns: TColumn[],
};
export const initialBoardState: TBoardState = {
  columns: [
    {id: "1", title: "Title 1", cards: []},
    {id: "2", title: "Title 2", cards: []},
  ],
};

export const boardReducer = (state: TBoardState = initialBoardState, action: BoardAction) => {
  switch (action.type) {
    case ADD_CARD_TO_COLUMN: {

      const newColumns = state.columns.map((c) => {
        if (c.id !== action.columnId) { return c; }
        return {
          ...c,
          cards: [...c.cards, action.card],
        };
      });

      return {
        ...state,
        columns: newColumns,
      };
    }

    default:
        return state;
  }
};
