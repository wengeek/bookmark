import {combineReducers} from 'redux';
import admin from './admin';
import app from './app';
import errorMessage from './errorMessage';

const rootReducer = combineReducers({
  app,
  admin,
  errorMessage
});
export default rootReducer;
