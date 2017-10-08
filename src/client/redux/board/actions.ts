import {TCard, TCardStatus} from "../../components/card/card.types";
import {TBoardState} from "../../components/board/board.types";
import {
  ADD_CARD_TO_COLUMN,
  ADD_CARD_TO_COLUMN_ACTION,
  CHANGE_ALL_CARD_STATUS,
  CHANGE_ALL_CARD_STATUS_ACTION,
  CHANGE_CARD,
  CHANGE_CARD_ACTION,
  CHANGE_BOARD_STATE,
  CHANGE_BOARD_STATE_ACTION,
} from "./types";

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
  changeCard: (card: TCard): CHANGE_CARD_ACTION => ({
    type: CHANGE_CARD,
    card: card,
  }),
  changeBoardState: (boardState: TBoardState): CHANGE_BOARD_STATE_ACTION => ({
    type: CHANGE_BOARD_STATE,
    state: boardState,
  }),
};
