import { TColumn } from "../column/column.types";
export type TBoardState = "hidden" | "showing" | "resolving";
export type TUser = { name: string };
export type TBoard = {
  state: TBoardState,
  columns: TColumn[],
  users: TUser[],
};
