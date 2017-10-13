import { TBoard } from "../../components/board/board.types";
import {
  ADD_CARD_TO_COLUMN,
  CHANGE_ALL_CARD_STATUS,
  CHANGE_BOARD_STATE,
  CHANGE_CARD,
  INIT_BOARD,
  TBoardAction,
} from "./types";
import _ from "lodash";

export const initialBoardState: TBoard = {
  state: "hidden",
  columns: [
    {id: "1", title: "Continue", cards: []},
    {id: "2", title: "Improvments", cards: []},
    {id: "3", title: "Idea", cards: []},
    {id: "4", title: "Flower", cards: []},
  ],
};

export const boardReducer = (state: TBoard = initialBoardState, action: TBoardAction) => {
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
          state: action.board.state,
          cards: _.uniqBy([...col.cards, ...newColCards], "id"),
        };
      });

      return {
        ...state,
        state: action.board.state,
        columns: newColumns,
      };
    }

    default:
        return state;
  }
};
