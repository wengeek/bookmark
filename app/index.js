import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {createHistory} from 'history';
import {Router, Route} from 'react-router';
import App from './containers/App';
import reducers from './reducers';
import 'normalize.css';
import 'font-awesome/css/font-awesome.min.css';

let store = createStore(reducers);
let history = createHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>

      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

