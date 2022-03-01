import { Dispatch } from 'redux';

export enum AuthType {
  SET_USER_LOGGED_IN = 'SET_USER_LOGGED_IN',
  SET_USER_LOGGED_OUT = 'SET_USER_LOGGED_OUT'
}

interface Set_user_logged_in {
  type: AuthType.SET_USER_LOGGED_IN,
  payload: boolean
}

interface Set_user_logged_out {
  type: AuthType.SET_USER_LOGGED_OUT,
  payload: boolean
}

export type Action = Set_user_logged_in | Set_user_logged_out

export const setUserLoggedIn = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: AuthType.SET_USER_LOGGED_IN,
      payload: true
    });
  };
};

export const setUserLoggedOut = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: AuthType.SET_USER_LOGGED_OUT,
      payload: false
    });
  };
};