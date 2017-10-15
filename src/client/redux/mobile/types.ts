import { TCard } from "../../components/card/card.types";

export const MOBILE_SHOW_CARD = "MOBILE_SHOW_CARD";
export type MOBILE_SHOW_CARD_ACTION = {
  type: typeof MOBILE_SHOW_CARD,
  card: TCard,
};

export type TShowingCardAction
  = MOBILE_SHOW_CARD_ACTION;

export type TShowingCardState = {
  card?: TCard,
};
