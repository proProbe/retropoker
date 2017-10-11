
export const SET_USER = "SET_USER";
export type SET_USER_ACTION = {
  type: typeof SET_USER,
  user: TUser,
};

export type TUserAction
= SET_USER_ACTION;

export type TUser = {
  name: string,
};

export type TUserState = {
  user?: TUser,
};
