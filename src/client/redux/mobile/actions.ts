import { TCard } from "../../views/desktop/card/card.types";
import {
  MOBILE_SHOW_CARD,
  MOBILE_SHOW_CARD_ACTION,
} from "./types";

// Action Creators
export const actionCreators = {
  mobileShowCard: (card: TCard): MOBILE_SHOW_CARD_ACTION => ({
    type: MOBILE_SHOW_CARD,
    card: card,
  }),
};
