import { TColumn } from "../column/column.types";
export type TBoardState = "hidden" | "showing";
export type TBoard = {
  state: TBoardState,
  columns: TColumn[],
};
