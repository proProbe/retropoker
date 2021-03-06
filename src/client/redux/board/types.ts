import { TCard, TCardStatus } from "../../views/desktop/card/card.types";
import { TUser } from "../../views/desktop/board/board.types";

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

export const CHANGE_CARD = "CHANGE_CARD";
export type CHANGE_CARD_ACTION = {
  type: typeof CHANGE_CARD,
  card: TCard,
};

export const CHANGE_BOARD_STATE = "CHANGE_BOARD_STATE";
export type CHANGE_BOARD_STATE_ACTION = {
  type: typeof CHANGE_BOARD_STATE,
  state: string,
};

export const INIT_BOARD = "INIT_BOARD";
export type INIT_BOARD_ACTION = {
  type: typeof INIT_BOARD,
  board: {
    state: string,
    cards: Array<{columnId: string, card: TCard}>,
    users: TUser[],
  },
};

export const UPDATE_USERS = "UPDATE_USERS";
export type UPDATE_USERS_ACTION = {
  type: typeof UPDATE_USERS,
  users: TUser[],
};

export type TBoardAction
  = ADD_CARD_TO_COLUMN_ACTION
  | CHANGE_ALL_CARD_STATUS_ACTION
  | CHANGE_CARD_ACTION
  | CHANGE_BOARD_STATE_ACTION
  | INIT_BOARD_ACTION
  | UPDATE_USERS_ACTION;
