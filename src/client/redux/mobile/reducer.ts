import {
  MOBILE_SHOW_CARD,
  TShowingCardState,
  TShowingCardAction,
} from "./types";

export const initialErrorState: TShowingCardState = {
  card: undefined,
};

export const mobileShowingCardReducer = (state: TShowingCardState = initialErrorState, action: TShowingCardAction) => {
  switch (action.type) {
    case MOBILE_SHOW_CARD: {
      return {
        ...state,
        card: action.card,
      };
    }

    default:
      return state;
  }
};
