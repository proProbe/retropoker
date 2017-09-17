import { TBoard } from "../../components/board/board.types";
import {
  ADD_CARD_TO_COLUMN,
  ADD_CARD_TO_COLUMN_ACTION,
  CHANGE_ALL_CARD_STATUS,
  CHANGE_ALL_CARD_STATUS_ACTION,
  CHANGE_CARD_DESCRIPTION,
  CHANGE_CARD_DESCRIPTION_ACTION,
  CHANGE_BOARD_STATE,
  CHANGE_BOARD_STATE_ACTION,
} from "./actions";

type BoardAction
  = ADD_CARD_TO_COLUMN_ACTION
  | CHANGE_ALL_CARD_STATUS_ACTION
  | CHANGE_CARD_DESCRIPTION_ACTION
  | CHANGE_BOARD_STATE_ACTION;

export const initialBoardState: TBoard = {
  state: "hidden",
  columns: [
    {id: "1", title: "Title 1", cards: []},
    {id: "2", title: "Title 2", cards: []},
    {id: "3", title: "Title 3", cards: []},
    {id: "4", title: "Title 4", cards: []},
  ],
};

export const boardReducer = (state: TBoard = initialBoardState, action: BoardAction) => {
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

    case CHANGE_ALL_CARD_STATUS: {
      const newColumns = state.columns.map((c) => {
        const newCards = c.cards.map((card) => {
          return {
            ...card,
            status: action.status,
          }
        });
        return {
          ...c,
          cards: newCards,
        };
      });
      return {
        ...state,
        columns: newColumns,
      };
    }

    case CHANGE_CARD_DESCRIPTION: {
      const {cardId, description} = action;
      const newColumns = state.columns.map((c) => {
        const newCards = c.cards.map((card) => {
          if (cardId !== card.id) { return card; }
          return {
            ...card,
            description: action.description,
          };
        });
        return {
          ...c,
          cards: newCards,
        };
      });
      return {
        ...state,
        columns: newColumns,
      };
    }

    case CHANGE_BOARD_STATE: {
      const boardState = action.state;
      return {
        ...state,
        state: boardState,
      };
    }

    default:
        return state;
  }
};
