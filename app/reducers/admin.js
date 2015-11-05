import {REGISTER, LOGIN} from '../constants/ActionTypes';

export default function records(state = {
  rtn: 0,
  msg: ''
}, action) {
  switch (action.type) {
  case REGISTER:
    return Object.assign({}, state, {
      rtn: action.rtn,
      msg: action.msg
    });
    break;
  case LOGIN:
    return Object.assign({}, state, {
      rtn: action.rtn,
      msg: action.msg
    });
  default:
    return state;
  }
}
