import React from 'react'; 
import ReactDOM from 'react-dom';
import 'babel-core/polyfill';
import {Provider} from 'react-redux';
import {createHistory} from 'history';
import {Router, Route} from 'react-router';
import configureStore from './store/configureStore';
import App from './containers/App';
import Admin from './containers/Admin';
import Login from './containers/admin/Login';
import Register from './containers/admin/Register';
import 'normalize.css';
import 'font-awesome/css/font-awesome.min.css';

let store = configureStore();
let history = createHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>

        <Route path="/admin" component={Admin}>
          <Route path="/admin/login" component={Login} />
          <Route path="/admin/register" component={Register} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

