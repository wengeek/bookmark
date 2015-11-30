/**
 * 错误信息
 */
import {ERROR_MESSAGE} from '../constants/ActionTypes';

export default function errorMessage(state = null, action) {
  switch (action.type) {
  case ERROR_MESSAGE:
    return action.error;
  default:
    return state;
  }
}

