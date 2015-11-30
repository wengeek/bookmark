'use strict';
/**
 * 路由设置
 */
var express = require('express');
var User = require('./controllers/user');
var Tag = require('./controllers/tag');
var Bookmark = require('./controllers/bookmark');
var Category = require('./controllers/category');
var handler = require('./utils/handler');
var rtn = require('./utils/rtn');
var router = express.Router();

function needLogin(req, res, next) {
  if (!req.isAuthenticated()) {
    handler.handleError(res, rtn.NO_LOGIN, '用户未登录');
  } else {
    next();
  }
}

router.post('/register', User.register);
router.post('/login', User.login);

router.get('/tags/:categoryId', Tag.index);

router.get('/categories', needLogin, Category.index);
router.get('/categoriesWithNoEmpty', Category.categories);
router.get('/categoriesWithSubdoc', needLogin, Category.all);
router.post('/category/add', Category.add);

router.post('/tag/add', needLogin, Tag.add);

router.post('/bookmark/add', needLogin, Bookmark.add);

router.get('*', function(req, res) {
  res.status(404).json({
    rtn: 404
  });
});

module.exports = router;
