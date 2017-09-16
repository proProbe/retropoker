export type TCardStatus = "hidden" | "unread" | "showing" | "read";
export type TCard = {
  id: string;
  description: string;
  status: TCardStatus;
};
