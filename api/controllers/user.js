var passport = require('passport');
var userHelper = require('../helpers/user');
var utils = require('../utils');
var rtn = require('../utils/rtn');
var cookieConfig = require('../../config/cookie');

exports.register = function(req, res) {
  userHelper.create({
    email: req.body.email,
    name: req.body.username,
    password: req.body.password
  }).then(function(account) {
    passport.authenticate('local')(req, res, function () {
      res.cookie('username', req.user.name, cookieConfig);

      res.status(200).json({
        rtn: rtn.SUCCESS
      });
    });
  }).catch(function(err) {
    var msg = '服务器连接失败，请稍后重试';
    if(err && /duplicate/ig.test(err.errmsg)) {
      if(/name/ig.test(err.errmsg)) {
        msg = '该姓名已存在';
      }

      if(err && /email/ig.test(err.errmsg)) {
        msg = '邮箱已被注册过';
      }
    }
    return utils.handleError(res, msg);
  });
};

exports.login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if(err) {
      return utils.handleError(res, '服务器错误');
    }
    if(!user) {
      return res.status(200).json({
        rtn: rtn.NO_USER,
        msg: '邮箱或密码输入有误'
      });
    }

    req.logIn(user, function(err) {
      if(err) {
        return next(err);
      }

      res.cookie('username', req.user.name, cookieConfig);
      return res.status(200).json({
        rtn: rtn.SUCCESS
      });

    });
  })(req, res, next);

  // passport.authenticate('local')(req, res, function () {
  //  res.status(200).json({
  //    rtn: rtn.SUCCESS
  //  });
  // });
 
};

exports.getUsers = function(req, res) {
  console.log(req.user);
  console.log(req.isAuthenticated());

  userHelper.findAll().then(function(users) {
    res.status(200).json({
      rtn: 0,
      data: users
    });
  });
}

