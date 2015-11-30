import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import redirectMiddleware from '../middleware/redirect';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  redirectMiddleware
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  return store;
}
