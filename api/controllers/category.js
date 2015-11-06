var categoryHelper = require('../helpers/category');
var utils = require('../utils');
var rtn = require('../utils/rtn');

exports.index = function(req, res) {

};

exports.add = function(req, res) {
  var name = req.body.name;

  if (!req.isAuthenticated()) {
    return utils.handleError(res, '用户未登录');
  }

  categoryHelper.create({
    name: name,
    author: req.user,
    tags: []
  }).then(function(category) {
    res.status(200).json({
      rtn: rtn.SUCCESS,
      category: category
    });
  }).catch(function(e) {
    var msg = '服务器连接失败，请稍后重试';
    if (err && /duplicate/ig.test(err.errmsg)) {
      msg = '该分类已存在';
    }

    utils.handleError(res, msg);
  });
};
