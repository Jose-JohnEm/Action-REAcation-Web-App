import { AuthType, Action } from './actions/auth';

const initialState = {
  isLogged: false,
};

const authReducer = (state = initialState, action: Action) => {
  switch (action.type) {
  case AuthType.SET_USER_LOGGED_IN:
    return { ...state, isLogged: action.payload };
  case AuthType.SET_USER_LOGGED_OUT:
    return { ...state, isLogged: action.payload };
  default:
    return state;
  }
}

export default authReducer;