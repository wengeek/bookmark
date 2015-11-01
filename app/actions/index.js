import * as actions from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';

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

export function requestRegister(username, email, password) {
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
        password: password
      })
    }).then(response => response.json()).then(json => {
      console.log(json);
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

export function requestLogin(email, password) {
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
        password: password
      })      
    }).then(response => response.json()).then(json => {
      console.log(json);
      dispatch(login({
        rtn: json.rtn,
        msg: json.msg
      }));
    });
  };
}