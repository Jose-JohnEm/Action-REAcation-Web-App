import { Dispatch } from 'redux';
import axios from 'axios';

export enum AuthType {
  SET_USER_LOGGED_IN = 'SET_USER_LOGGED_IN',
  SET_USER_LOGGED_OUT = 'SET_USER_LOGGED_OUT'
}

interface ILoggedIn {
  type: AuthType.SET_USER_LOGGED_IN,
  payload: boolean
}

interface ILoggedOut {
  type: AuthType.SET_USER_LOGGED_OUT,
  payload: boolean
}

export type Action = ILoggedIn | ILoggedOut

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

export interface ISignUpData {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string
}

export const signUp = (body: ISignUpData) => {
  axios
    .post('http://127.0.0.1:8080/auth/signup/', body, {
      headers: {
        'Content-Type' : 'application/json',
      },
    })
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.error(err.response);
    });
};