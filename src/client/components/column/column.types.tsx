import { TCard } from "../card/card.types";
export type TColumn = {
  id: string,
  title?: string,
  cards: TCard[],
};
