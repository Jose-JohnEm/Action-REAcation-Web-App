export const SET_ACTION = 'SET_ACTION';
export const SET_REACTION = 'SET_REACTION';
export const SET_SERVICE_ACTION = 'SET_SERVICE_ACTION';
export const SET_SERVICE_REACTION = 'SET_SERVICE_REACTION';
export const SET_PARAMETER_ACTION = 'SET_PARAMETER_ACTION';
export const SET_PARAMETER_REACTION = 'SET_PARAMETER_REACTION';
export const CLEAR_AREA = 'CLEAR_AREA';


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