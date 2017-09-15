import {ICard} from "../../components/card/card";

export const ADD_CARD = "ADD_CARD";

export type ADD_CARD_ACTION = {
  type: typeof ADD_CARD,
  card: ICard,
};

// Action Creators
export const actionCreators = {
  addCard: (card: ICard): ADD_CARD_ACTION => ({
    type: ADD_CARD,
    card: card,
  }),
};
