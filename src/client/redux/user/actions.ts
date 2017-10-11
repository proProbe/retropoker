import {
  SET_USER,
  SET_USER_ACTION,
  TUser,
} from "./types";

// Action Creators
export const actionCreators = {
  setUser: (user: TUser): SET_USER_ACTION => ({
    type: SET_USER,
    user: user,
  }),
};
