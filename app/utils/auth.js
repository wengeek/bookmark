/**
 * 权限验证
 */

import cookie from './cookie';

export default {
  logout() {
    cookie.remove('connect.sid');
    cookie.remove('username');
  },

  loggedIn() {
    let sid = cookie.get('connect.sid');
    let username = cookie.get('username');
    return sid && sid.length > 0 && username !== undefined;
  },

  getUser() {
    return cookie.get('username');
  }
};
