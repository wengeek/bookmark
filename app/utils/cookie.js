export default {
  get(key) {
    let match = document.cookie.match(new RegExp(key + '=([^;]+)'));
    if(match) {
      return decodeURIComponent(match[1]);
    }

    return;
  },

  remove(key) {
    document.cookie = key + '=""; expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';

    return true;
  }
};