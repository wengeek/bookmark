/**
 * 封装fetch，处理错误，非0情况｀
 */
import fetch from 'isomorphic-fetch';
import {ERROR_MESSAGE} from '../constants/ActionTypes';

/**
 * fetchData
 *
 * @param dispatch Redux分发
 * @param url 请求URL
 * @param headers 请求头
 * @param cb 成功回调
 * @return undefined
 */
export default function fetchData(dispatch, url, headers, cb) {
  fetch(url, headers).then(response => response.json()).then(json => {
    if (json.rtn === 0) {
      cb && cb(json);
    } else {
      if (json.rtn === 2) {//未登录
        dispatch({
          type: ERROR_MESSAGE,
          error: json.msg,
          redirect: '/admin/login'
        });
      } else {
        dispatch({
          type: ERROR_MESSAGE,
          error: json.msg
        });
      }
    }
  }).catch(function(err) {
    dispatch({
      type: ERROR_MESSAGE,
      error: err
    });
  });
}
