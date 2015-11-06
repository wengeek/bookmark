'use strict';
/**
 * 路由设置
 */
var express = require('express');
var User = require('./controllers/user');
var Tag = require('./controllers/tag');
var Category = require('./controllers/category');
var router = express.Router();

router.post('/register', User.register);
router.post('/login', User.login);
router.get('/register', User.getUsers);

router.get('/tags', Tag.index);

router.get('/categories', Category.index);
router.post('/category/add', Category.add);

router.get('*', function(req, res) {
  res.status(404).json({
    rtn: 404
  });
});

module.exports = router;
