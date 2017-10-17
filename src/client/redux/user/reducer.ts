import {
  TUserAction,
  TUserState,
  SET_USER,
} from "./types";

export const initialUserState: TUserState = {
  user: undefined,
  // user: {name: "test"},
};

export const userReducer = (state: TUserState = initialUserState, action: TUserAction) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.user,
      };
    }

    default:
        return state;
  }
};
