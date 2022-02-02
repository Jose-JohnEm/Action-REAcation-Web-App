export const SET_USER_LOGGED_IN = 'SET_USER_LOGGED_IN';
export const SET_USER_LOGGED_OUT = 'SET_USER_LOGGED_OUT';

export const setUserLoggedIn = () => {
  return dispatch => {
    dispatch({
      type: SET_USER_LOGGED_IN,
      payload: true,
    });
  };
};

export const setUserLoggedOut = () => {
  return dispatch => {
    dispatch({
      type: SET_USER_LOGGED_OUT,
      payload: false,
    });
  };
};