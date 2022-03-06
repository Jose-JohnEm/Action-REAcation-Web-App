import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './authReducer';
import userReducer from './userReducer';
import areaReducer from './areaReducer';


const rootReducer = combineReducers({authReducer, userReducer, areaReducer});

export const Store = createStore(rootReducer, applyMiddleware(thunk));