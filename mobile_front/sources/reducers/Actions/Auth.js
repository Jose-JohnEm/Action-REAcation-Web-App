import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Alert } from 'react-native';
import { authorize } from 'react-native-app-auth';
import { getUserData } from './UserData';

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
  const url = await EncryptedStorage.getItem('url');
  await axios.post(url + '/auth/signin', body, {
    headers: {
      'Content-Type' : 'application/json',
    },
  })
    .then(async (response) => {
      await EncryptedStorage.setItem('accessToken', response.data.token);
      dispatch(getUserData());
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
  const url = await EncryptedStorage.getItem('url');

  await axios.post(url + '/auth/signup', body, {
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

export const signInOffice = (config) => async dispatch => {
  try {
    const authState = await authorize(config);
    console.log(authState.accessToken);
    const response = await axios.get('https://graph.microsoft.com/v1.0/me', {
      headers: {
        Authorization: 'Bearer ' + authState.accessToken,
        'Content-Type' : 'application/json',
      },
    });
    console.log(response?.data);
  } catch (error) {
    console.error(error);
  }
};

export const signInGithub = (config) => async dispatch => {
  try {
    const authState = await authorize(config);
    const response = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: 'token ' + authState.accessToken,
        'Content-Type' : 'application/json',
      },
    });
    const url = await EncryptedStorage.getItem('url');
    await axios.post(url + '/auth/signinGithub', response?.data?.id, {
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
  } catch (error) {
    console.error(error.response);
  }
};