import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {createHistory} from 'history'
import {Router} from 'react-router';
import App from './containers/App';
import reducers from './reducers';

let store = createStore(reducers);
let history = createHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
    </Router>
  </Provider>,
  document.getElementById('root')
);

