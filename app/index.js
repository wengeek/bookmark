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
import './css/style.css';
import auth from './utils/auth';

let store = configureStore();
let history = createHistory();

function requireAuth(nextState, replaceState) {
  if(!auth.loggedIn()) {
    replaceState({ nextPathname: nextState.location.pathname }, '/admin/login');
  }
}

function notRequireAuth(nextState, replaceState) {
  if(auth.loggedIn()) {
    replaceState({ nextPathname: nextState.location.pathname }, '/admin');
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="/admin" component={Admin} onEnter={requireAuth} />
        <Route path="/admin/register" component={Register} onEnter={notRequireAuth}/>
        <Route path="/admin/login" component={Login} onEnter={notRequireAuth}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

