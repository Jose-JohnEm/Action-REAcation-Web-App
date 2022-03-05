import axios from 'axios';
import {API_URL} from '../../constant/Constant';
import EncryptedStorage from 'react-native-encrypted-storage';
import { setUserLoggedOut } from './Auth';
import { Alert } from 'react-native';
import { cleanObj } from '../../Utils/Utils';

export const GET_USER_DATA = 'GET_USER_DATA';
export const UPDATE_USER_SERVICES = 'UPDATE_USER_SERVICES';

export const getUserData = () => async dispatch => {
  try {
    const accessToken = await EncryptedStorage.getItem('accessToken');
    const response = await axios.get(API_URL + '/user/', {
      headers: {
        Authorization: 'bearer ' + accessToken,
        'Content-Type' : 'application/json',
      },
    });

    dispatch({
      type: GET_USER_DATA,
      payload: response.data.data,
    });
  } catch (error) {
    console.error(error);
    dispatch(setUserLoggedOut());
  }
};

export const updateUserServices = (body) => async dispatch => {
  try {
    const accessToken = await EncryptedStorage.getItem('accessToken');
    await axios.post(API_URL + '/user/services/', body, {
      headers: {
        Authorization: 'bearer ' + accessToken,
        'Content-Type' : 'application/json',
      },
    });
    dispatch(getUserData());
  } catch (error) {
    console.error(error);
    dispatch(setUserLoggedOut());
  }
};

export const updateUser = ({body}) => async dispatch => {
  const accessToken = await EncryptedStorage.getItem('accessToken');

  await axios.post(API_URL + '/user/', cleanObj(body), {
    headers: {
      Authorization: 'bearer ' + accessToken,
      'Content-Type' : 'application/json',
    },
  }).then(() => {
    dispatch(getUserData());
    Alert.alert(
      'SUCCESS',
      'Your profile has been updated',
      [
        {
          text: 'OK',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        }
      ]
    );
  }).catch((error) => {
    console.error(error.response);
    dispatch(setUserLoggedOut());
    Alert.alert(
      'ERROR',
      'Your profile hasn\'t been updated',
      [
        {
          text: 'OK',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        }
      ]
    );
  });
};
