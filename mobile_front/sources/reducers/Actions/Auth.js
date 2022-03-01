import axios from 'axios';
import API_URL from '../../constant/Constant';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Alert } from 'react-native';

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
  await axios.post('http://10.0.2.2:8080/auth/signin', body, {
    headers: {
      'Content-Type' : 'application/json',
    },
  })
    .then(function(response) {
      EncryptedStorage.setItem('accessToken', response.data.accessToken);
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
  await axios.post('http://10.0.2.2:8080/auth/signup', body, {
    headers: {
      'Content-Type' : 'application/json',
    },
  })
    .then(function(response) {
      console.log(response.data);
      EncryptedStorage.setItem('accessToken', response.data.accessToken);
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
      return false;
    });
};