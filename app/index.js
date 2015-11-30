import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-core/polyfill';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute} from 'react-router';
import configureStore from './store/configureStore';
import App from './containers/App';
import Category from './containers/Category';
import Admin from './containers/Admin';
import Login from './containers/admin/Login';
import Register from './containers/admin/Register';
import AdminBookmarks from './containers/admin/Bookmarks';
import 'normalize.css';
import 'font-awesome/css/font-awesome.min.css';
import './css/style.css';
import auth from './utils/auth';
import history from './utils/history';

let store = configureStore();

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
        <IndexRoute component={Category} />
        <Route path="/category(/:categoryId)" component={Category}/>
        <Route path="/admin" component={Admin} onEnter={requireAuth}>
          <Route path="/admin/bookmarks" component={AdminBookmarks} />
        </Route>
        <Route path="/admin/register" component={Register} onEnter={notRequireAuth}/>
        <Route path="/admin/login" component={Login} onEnter={notRequireAuth}/>
      </Route>
      <Route path="*" component={App}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);

