export const SET_ACTION = 'SET_ACTION';
export const SET_DESC_ACTION = 'SET_DESC_ACTION';
export const SET_REACTION = 'SET_REACTION';
export const SET_DESC_REACTION = 'SET_DESC_REACTION';
export const SET_SERVICE_ACTION = 'SET_SERVICE_ACTION';
export const SET_SERVICE_REACTION = 'SET_SERVICE_REACTION';
export const SET_PARAMETER_ACTION = 'SET_PARAMETER_ACTION';
export const SET_PARAMETER_REACTION = 'SET_PARAMETER_REACTION';
export const CLEAR_AREA = 'CLEAR_AREA';
export const SET_TITLE = 'SET_TITLE';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { setUserLoggedOut } from './Auth';
import { getUserData } from './UserData';

export const setTitleAREA = (title) => {
  return async dispatch => {
    try {
      dispatch({
        type: SET_TITLE,
        payload: title,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const setDescAction = (desc) => {
  return async dispatch => {
    try {
      dispatch({
        type: SET_DESC_ACTION,
        payload: desc,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const setDescReaction = (desc) => {
  return async dispatch => {
    try {
      dispatch({
        type: SET_DESC_REACTION,
        payload: desc,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const setServicesAction = (services) => {
  return async dispatch => {
    try {
      dispatch({
        type: SET_SERVICE_ACTION,
        payload: services,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const setServicesReaction = (services) => {
  return async dispatch => {
    try {
      dispatch({
        type: SET_SERVICE_REACTION,
        payload: services,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const setAction = (action) => {
  return async dispatch => {
    try {
      dispatch({
        type: SET_ACTION,
        payload: action,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const setReaction = (reaction) => {
  return async dispatch => {
    try {
      dispatch({
        type: SET_REACTION,
        payload: reaction,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const setParameterAction = (parameter) => {
  return async dispatch => {
    try {
      dispatch({
        type: SET_PARAMETER_ACTION,
        payload: parameter,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const setParameterReaction = (parameter) => {
  return async dispatch => {
    try {
      dispatch({
        type: SET_PARAMETER_REACTION,
        payload: parameter,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const clearArea = () => {
  return async dispatch => {
    try {
      dispatch({
        type: SET_PARAMETER_REACTION,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const setAREA = (body) => async dispatch => {
  const url = await EncryptedStorage.getItem('url');

  try {
    const accessToken = await EncryptedStorage.getItem('accessToken');
    console.log('--> ' + accessToken);
    await axios.post(url + `/area?area_name=${body.title}&action_service=${body.serviceAction}&action_name=${body.action}&action_params=${body.parameterAction}&reaction_service=${body.serviceReaction}&reaction_name=${body.reaction}&reaction_params=${body.parameterReaction}`, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type' : 'application/json',
      },
    });
    dispatch(getUserData());
  } catch (error) {
    console.error(error.response);
    // dispatch(setUserLoggedOut());
  }
};
