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

export const signUp = async (body: ISignUpData) => {
  try {
    const response = await axios
      .post('http://127.0.0.1:8080/auth/signup/', body, {
        headers: {
          'Content-Type' : 'application/json',
        },
      });
    if (response.status === 200) {
      console.log(response.data.data);
      localStorage.setItem('events', JSON.stringify(response.data.data.events));
      localStorage.setItem('userProfile', JSON.stringify({
        lastName: response.data.data.lastName,
        firstName: response.data.data.firstName,
        email: response.data.data.email
      }));
      localStorage.setItem('accessToken', response.data.data.token);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export interface ISignInData {
  email: string,
  password: string
}

export const signIn = async (body: ISignInData) => {
  try {
    const response = await axios
      .post('http://127.0.0.1:8080/auth/signin/', body, {
        headers: {
          'Content-Type' : 'application/json',
        },
      });
    if (response.status === 200) {
      console.log(response.data.data);
      localStorage.setItem('events', JSON.stringify(response.data.data.events));
      localStorage.setItem('userProfile', JSON.stringify({
        lastName: response.data.data.lastName,
        firstName: response.data.data.firstName,
        email: response.data.data.email
      }));
      // console.log(response.data.data.token);
      localStorage.setItem('accessToken', response.data.data.token);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};