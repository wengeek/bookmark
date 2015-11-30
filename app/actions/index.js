import * as actions from '../constants/ActionTypes';
import fetchData from '../utils/fetch';
import md5 from 'md5';

/**
 * 用户注册
 */
function register(redirect) {
  return {
    type: actions.REGISTER,
    redirect: redirect
  };
}

export function requestRegister(username, email, password, redirect) {
  return dispatch => {
    fetchData(dispatch, '/api/register', {
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
    }, function() {
      dispatch(register(redirect));
    });
  };
}

/**
 * 用户登录
 */
function login(redirect) {
  return {
    type: actions.LOGIN,
    redirect: redirect
  };
}

export function requestLogin(email, password, redirect) {
  return dispatch => {
    fetchData(dispatch, '/api/login', {
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
    }, function() {
      dispatch(login(redirect));
    });
  };
}

/**
 * 获取分类列表
 */
function categories(categories) {
  return {
    type: actions.CATEGORIES,
    categories: categories
  };
}

export function requestCategories() {
  return dispatch => {
    fetchData(dispatch, '/api/categories', {
      credentials: 'include'
    }, function(json) {
      dispatch(categories(json.data));
    });
  };
}

/**
 * 获取所有分类带标签
 */
function categoriesWithSubdoc(categories) {
  return {
    type: actions.CATEGORIES_WITH_SUBDOC,
    categoriesWithSubdoc: categories
  };
}

export function requestCategoriesWithSubdoc() {
  return dispatch => {
    fetchData(dispatch, '/api/categoriesWithSubdoc', {
      credentials: 'include'
    }, function(json) {
      dispatch(categoriesWithSubdoc(json.data));
    });
  };
}

/**
 * 添加分类
 */
function category(category) {
  return {
    type: actions.CATEGORY,
    category: category
  };
}

export function requestAddCategory(name, desc, cb) {
  return dispatch => {
    fetchData(dispatch, '/api/category/add', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        desc: desc
      })
    }, function(json) {
      cb && cb();
      dispatch(category(json.data));
    });
  };
}

/**
 * 添加标签
 */
function tag(tag) {
  return {
    type: actions.TAG,
    tag: tag
  };
}

export function requestAddTag(params, cb) {
  return dispatch => {
    fetchData(dispatch, '/api/tag/add', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }, function(json) {
      cb && cb();
      dispatch(tag(json.data));
    });
  };
}

/**
 * 请求所有标签
 */
function bookmarks(bookmarks) {
  return {
    type: actions.BOOKMARKS,
    bookmarks: bookmarks
  };
}

export function requestBookmarks() {
  return dispatch => {
    fetchData(dispatch, '/api/bookmark/add', {

    }, function(json) {
      dispatch(bookmarks(json.data));
    });
  };
}

/**
 * 请求添加标签
 */
function bookmark(bookmark) {
  return {
    type: actions.BOOKMARK,
    bookmark: bookmark
  };
}

export function requestAddBookmark(params, cb) {
  return dispatch => {
    fetchData(dispatch, '/api/bookmark/add', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }, function(json) {
      cb && cb();
      dispatch(bookmark(json.data));
    });
  };
}

/**
 * 获取非空分类
 */
function categoriesWithNoEmpty(categories) {
  return {
    type: actions.CATEGORY_WITH_NO_EMPTY,
    categories: categories
  };
}

export function requestCategoriesWithNoEmpty() {
  return dispatch => {
    fetchData(dispatch, '/api/categoriesWithNoEmpty', {}, function(json) {
      dispatch(categoriesWithNoEmpty(json.data));
    });
  };
}

/**
 * 获取某分类下所有书签
 */
function tags(tags) {
  return {
    type: actions.TAGS,
    tags: tags
  };
}

export function requestTags(categoryId) {
  return dispatch => {
    fetchData(dispatch, '/api/tags/' + categoryId, null, json => {
      dispatch(tags(json.data));
    });
  };
}

/**
 * 重置错误信息
 */
export function resetErrorMessage() {
  return {
    type: actions.ERROR_MESSAGE,
    error: null
  };
}

