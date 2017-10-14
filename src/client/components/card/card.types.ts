export type TCardStatus = "unread" | "showing" | "read" | "edit" | "add" | "resolved" | "error";
export type TCard = {
  id: string,
  author: string,
  description: string,
  status: TCardStatus,
};
