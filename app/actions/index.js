import * as actions from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';
import md5 from 'md5';

/**
 * 用户注册
 */
function register(rn) {
  return {
    type: actions.REGISTER,
    rtn: rn.rtn,
    msg: rn.msg || ''
  };
}

export function requestRegister(username, email, password, cb) {
  return dispatch => {
    fetch('/api/register', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: md5(md5(password))
      })
    }).then(response => response.json()).then(json => {
      if (json.rtn === 0) {
        cb && cb();
      }
      dispatch(register({
        rtn: json.rtn,
        msg: json.msg
      }));
    });
  };
}

/**
 * 用户登录
 */
function login(rn) {
  return {
    type: actions.LOGIN,
    rtn: rn.rtn,
    msg: rn.msg || ''
  };
}

export function requestLogin(email, password, cb) {
  return dispatch => {
    fetch('/api/login', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: md5(md5(password))
      })      
    }).then(response => response.json()).then(json => {
      if(json.rtn === 0) {
        cb && cb();
      }
      dispatch(login({
        rtn: json.rtn,
        msg: json.msg
      }));
    });
  };
}
