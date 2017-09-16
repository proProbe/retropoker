import {TCard, TCardStatus} from "../../components/card/card.types";
import {TBoardState} from "../../components/board/board.types";

export const ADD_CARD_TO_COLUMN = "ADD_CARD_TO_COLUMN";
export type ADD_CARD_TO_COLUMN_ACTION = {
  type: typeof ADD_CARD_TO_COLUMN,
  columnId: string,
  card: TCard,
};

export const CHANGE_ALL_CARD_STATUS = "CHANGE_ALL_CARD_STATUS";
export type CHANGE_ALL_CARD_STATUS_ACTION = {
  type: typeof CHANGE_ALL_CARD_STATUS,
  status: TCardStatus,
};

export const CHANGE_CARD_DESCRIPTION = "CHANGE_CARD_DESCRIPTION";
export type CHANGE_CARD_DESCRIPTION_ACTION = {
  type: typeof CHANGE_CARD_DESCRIPTION,
  cardId: string,
  description: string,
};

export const CHANGE_BOARD_STATE = "CHANGE_BOARD_STATE";
export type CHANGE_BOARD_STATE_ACTION = {
  type: typeof CHANGE_BOARD_STATE,
  state: string,
};

// Action Creators
export const actionCreators = {
  addCardToColumn: (columnId: string, card: TCard): ADD_CARD_TO_COLUMN_ACTION => ({
    type: ADD_CARD_TO_COLUMN,
    columnId: columnId,
    card: card,
  }),
  changeAllCardsStatus: (status: TCardStatus): CHANGE_ALL_CARD_STATUS_ACTION => ({
    type: CHANGE_ALL_CARD_STATUS,
    status: status,
  }),
  changeCardDescription: (cardId: string, description: string): CHANGE_CARD_DESCRIPTION_ACTION => ({
    type: CHANGE_CARD_DESCRIPTION,
    cardId: cardId,
    description: description,
  }),
  changeBoardState: (boardState: TBoardState): CHANGE_BOARD_STATE_ACTION => ({
    type: CHANGE_BOARD_STATE,
    state: boardState,
  }),
};
