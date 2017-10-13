export type TCardStatus = "unread" | "showing" | "read" | "edit" | "add";
export type TCard = {
  id: string,
  author: string,
  description: string,
  status: TCardStatus,
};
