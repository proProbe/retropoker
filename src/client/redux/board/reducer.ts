import { TBoard } from "../../components/board/board.types";
import {
  ADD_CARD_TO_COLUMN,
  ADD_CARD_TO_COLUMN_ACTION,
  CHANGE_ALL_CARD_STATUS,
  CHANGE_ALL_CARD_STATUS_ACTION,
  CHANGE_BOARD_STATE,
  CHANGE_BOARD_STATE_ACTION,
  CHANGE_CARD,
  CHANGE_CARD_ACTION,
  INIT_BOARD,
  INIT_BOARD_ACTION,
} from "./actions";

type BoardAction
  = ADD_CARD_TO_COLUMN_ACTION
  | CHANGE_ALL_CARD_STATUS_ACTION
  | CHANGE_CARD_ACTION
  | CHANGE_BOARD_STATE_ACTION
  | INIT_BOARD_ACTION;

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

    case CHANGE_CARD: {
      const {card: changedCard} = action;
      const newColumns = state.columns.map((col) => {
        const newCards = col.cards.map((card) => {
          if (card.id !== changedCard.id) { return card; }
          return changedCard;
        });
        return {
          ...col,
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

    case INIT_BOARD: {
      const cards = action.board.cards;
      const newColumns = state.columns.map((col) => {
        const newColCards = cards
          .filter(card => card.columnId === col.id)
          .map(card => card.card);
        return {
          ...col,
          cards: [...col.cards, ...newColCards],
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
