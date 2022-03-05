import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './authReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({authReducer, userReducer});

export const Store = createStore(rootReducer, applyMiddleware(thunk));