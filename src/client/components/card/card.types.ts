export type TCardStatus = "unread" | "read" | "edit" | "resolved" | "error";
export type TCard = {
  id: string,
  author: string,
  description: string,
  status: TCardStatus,
};
