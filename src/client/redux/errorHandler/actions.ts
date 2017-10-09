import { TError } from "../../components/common/errorHandlers/error.types";
import {
  THROW_ERROR,
  THROW_ERROR_ACTION,
  RESOLVE_ERROR,
  RESOLVE_ERROR_ACTION,
} from "./types";

// Action Creators
export const actionCreators = {
  throwError: (error: TError): THROW_ERROR_ACTION => ({
    type: THROW_ERROR,
    error: error,
  }),
  resolveError: (): RESOLVE_ERROR_ACTION => ({
    type: RESOLVE_ERROR,
  }),
};
