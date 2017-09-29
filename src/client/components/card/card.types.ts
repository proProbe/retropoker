export type TCardStatus = "hidden" | "unread" | "showing" | "read" | "edit" | "add";
export type TCard = {
  id: string;
  description: string;
  status: TCardStatus;
};