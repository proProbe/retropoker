// export type TCardStatus = "unread" | "read" | "edit" | "resolved" | "error";

export type TCardStatusUnread = {type: "unread"};
export type TCardStatusRead = {type: "read"};
export type TCardStatusEdit = {type: "edit"};
export type TCardStatusResolving = {type: "resolving", message: string};
export type TCardStatusResolved = {type: "resolved", message: string};
export type TCardStatusError = {type: "error", error: Error};

export type TCardStatus
  = TCardStatusEdit
  | TCardStatusError
  | TCardStatusRead
  | TCardStatusResolving
  | TCardStatusResolved
  | TCardStatusUnread;

export type TCard = {
  id: string,
  author: string,
  description: string,
  status: TCardStatus,
};
