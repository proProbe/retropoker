import {TError} from "../../components/common/errorHandlers/error.types";
import {
  THROW_ERROR,
  THROW_ERROR_ACTION,
  RESOLVE_ERROR,
  RESOLVE_ERROR_ACTION,
  TErrorAction,
  TErrorHandlerState,
} from "./types";

export const initialErrorState: TErrorHandlerState = {
  error: undefined,
};

export const errorHandlerReducer = (state: TErrorHandlerState = initialErrorState, action: TErrorAction) => {
  switch (action.type) {

    case THROW_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }

    case RESOLVE_ERROR: {
      return {
        ...state,
        error: undefined,
      };
    }

    default:
        return state;
  }
};
