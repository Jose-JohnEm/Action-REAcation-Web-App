import {GET_USER_DATA} from './Actions/UserData';

const initState = {
  data: {},
};

function userReducer(state = initState, action) {
  switch (action.type) {
  case GET_USER_DATA:
    return {...state, data: action.payload};
  default:
    return state;
  }
}

export default userReducer;