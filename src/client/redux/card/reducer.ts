import {ICard} from "../../components/card/card";
import {
  ADD_CARD,
  ADD_CARD_ACTION,
} from "./actions";

type CardAction = ADD_CARD_ACTION;

export interface ICardState {
  cards: ICard[];
}

export const initialCardState: ICardState = {
  cards: [],
};

export const cardReducer = (state: ICardState = initialCardState, action: CardAction) => {
  switch (action.type) {
  case ADD_CARD:
      return {
        ...state,
        cards: [...state.cards, action.card],
      };

  default:
      return state;
  }
};
