import { AuthType, Action } from './actions/auth';

interface Auth {
  isLogged: boolean
}

const initialState: Auth = {
  isLogged: true,
};

const authReducer = (state: Auth = initialState, action: Action):Auth => {
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