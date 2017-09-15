import {TCard} from "../../components/card/card.types";

export const ADD_CARD_TO_COLUMN = "ADD_CARD_TO_COLUMN";

export type ADD_CARD_TO_COLUMN_ACTION = {
  type: typeof ADD_CARD_TO_COLUMN,
  columnId: string,
  card: TCard,
};

// Action Creators
export const actionCreators = {
  addCardToColumn: (columnId: string, card: TCard): ADD_CARD_TO_COLUMN_ACTION => ({
    type: ADD_CARD_TO_COLUMN,
    columnId: columnId,
    card: card,
  }),
};
