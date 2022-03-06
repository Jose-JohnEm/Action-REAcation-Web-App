import {
  SET_ACTION,
  SET_REACTION,
  SET_SERVICE_ACTION,
  SET_SERVICE_REACTION,
  SET_PARAMETER_ACTION,
  SET_PARAMETER_REACTION,
  CLEAR_AREA,
  SET_TITLE,
  SET_DESC_ACTION,
  SET_DESC_REACTION
} from './Actions/Area';

const initState = {
  title: '',
  action: '',
  descAction : '',
  reaction: '',
  descReaction : '',
  serviceAction: '',
  serviceReaction: '',
  parameterAction: '',
  parameterReaction: '',
};

function areaReducer(state = initState, action) {
  switch (action.type) {
  case SET_TITLE:
    return {...state, title: action.payload};
  case SET_ACTION:
    return {...state, action: action.payload};
  case SET_DESC_ACTION:
    return {...state, descAction: action.payload};
  case SET_DESC_REACTION:
    return {...state, descReaction: action.payload};
  case SET_REACTION:
    return {...state, reaction: action.payload};
  case SET_SERVICE_ACTION:
    return {...state, serviceAction: action.payload};
  case SET_SERVICE_REACTION:
    return {...state, serviceReaction: action.payload};
  case SET_PARAMETER_ACTION:
    return {...state, parameterAction: action.payload};
  case SET_PARAMETER_REACTION:
    return {...state, parameterReaction: action.payload};
  case CLEAR_AREA:
    return {...state,
      title: '',
      action: '',
      descAction : '',
      reaction: '',
      descReaction : '',
      serviceAction: '',
      serviceReaction: '',
      parameterAction: '',
      parameterReaction: '',
    };
  default:
    return state;
  }
}

export default areaReducer;