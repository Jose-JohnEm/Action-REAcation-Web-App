import { createStore, combineReducers, applyMiddleware } from 'redux';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import thunk from 'redux-thunk';
import authReducer from './authReducer';

const rootReducer = combineReducers({ auth: authReducer });

type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk));

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;