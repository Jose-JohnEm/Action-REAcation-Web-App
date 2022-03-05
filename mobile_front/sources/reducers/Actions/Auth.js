import axios from 'axios';
import {API_URL} from '../../constant/Constant';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Alert } from 'react-native';
import { authorize } from 'react-native-app-auth';

export const SET_USER_LOGGED_IN = 'SET_USER_LOGGED_IN';
export const SET_USER_LOGGED_OUT = 'SET_USER_LOGGED_OUT';

export const setUserLoggedIn = () => {
  return async dispatch => {
    try {
      dispatch({
        type: SET_USER_LOGGED_IN,
        payload: true,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const setUserLoggedOut = () => {
  return async dispatch => {
    await EncryptedStorage.removeItem('accessToken');
    try {
      dispatch({
        type: SET_USER_LOGGED_OUT,
        payload: false,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const signIn = (body) => async dispatch => {
  await axios.post(API_URL + '/auth/signin', body, {
    headers: {
      'Content-Type' : 'application/json',
    },
  })
    .then(async (response) => {
      await EncryptedStorage.setItem('accessToken', response.data.token);
      dispatch(setUserLoggedIn());
    })
    .catch (err => {
      Alert.alert(
        'Sign In : Error',
        'Sorry, you have registered wrong informations',
        [
          {
            text: 'I understand',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          }
        ]
      );
      console.log(err);
      dispatch(setUserLoggedOut());
      return false;
    });
};

export const signUp = (body) => async dispatch => {
  await axios.post(API_URL + '/auth/signup', body, {
    headers: {
      'Content-Type' : 'application/json',
    },
  })
    .then(async (response) => {
      await EncryptedStorage.setItem('accessToken', response.data.token);
      dispatch(setUserLoggedIn());
    })
    .catch (err => {
      Alert.alert(
        'Sign Up : Error',
        'Sorry, you have registered wrong informations',
        [
          {
            text: 'I understand',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          }
        ]
      );
      console.log(err);
      dispatch(setUserLoggedOut());
    });
};

export const signInOAuth = (config) => async dispatch => {
  try {
    const authState = await authorize(config);
    await EncryptedStorage.setItem('accessToken', authState.accessToken);
    dispatch(setUserLoggedIn());
  } catch (error) {
    console.error(error.response);
  }
};