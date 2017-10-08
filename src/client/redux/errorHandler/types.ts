import {TError} from "../../components/common/errorHandlers/error.types";

export const THROW_ERROR = "THROW_ERROR";
export type THROW_ERROR_ACTION = {
  type: typeof THROW_ERROR,
  error: TError,
};

export const RESOLVE_ERROR = "RESOLVE_ERROR";
export type RESOLVE_ERROR_ACTION = {
  type: typeof RESOLVE_ERROR,
};

export type TErrorAction
  = THROW_ERROR_ACTION
  | RESOLVE_ERROR_ACTION;

export type TErrorHandlerState = {
  error?: TError,
};
