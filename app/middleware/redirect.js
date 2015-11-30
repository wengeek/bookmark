/**
 * 路由跳转中间件
 */
import history from '../utils/history';

export default store => next => action => {
  if (!action.redirect) {
    return next(action);
  }

  history.replaceState(null, action.redirect);
};

