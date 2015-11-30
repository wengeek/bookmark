var categoryHelper = require('../helpers/category');
var handler = require('../utils/handler');
var rtn = require('../utils/rtn');

/**
 * 获取所有分类
 */
exports.index = function(req, res) {
  categoryHelper.findAll().then(function(categories) {
    handler.send(res, categories);
  }).catch(function(err) {
    var msg = '服务器连接失败，请稍后重试';

    handler.handleError(res, msg);
  });
};

/**
 * 获取所有非空分类
 */
exports.categories = function(req, res) {
  categoryHelper.findAll().then(function(categories) {
    var data = [];

    categories.forEach(function(category) {
      var tags = category.tags;

      if (tags && tags.length > 0) {
        for (var key in tags) {
          if (tags[key].bookmarks && tags[key].bookmarks.length > 0) {
            data.push(category);
            break;
          }
        }
      }
    });

    handler.send(res, data);
  }).catch(function(err) {
    var msg = '服务器连接失败，请稍后重试';

    handler.handleError(res, msg);
  });
};

/**
 * 获取所有分类带书签
 */
exports.all = function(req, res) {
  categoryHelper.findAllWithSubDoc().then(function(categories) {
    handler.send(res, categories);
  }).catch(function(err) {
    var msg = '服务器连接失败，请稍后重试';

    handler.handleError(res, msg);
  });
};

/**
 * 添加书签分类
 * 请求类型：POST
 * name 书签名称
 * desc 书签描述
 */
exports.add = function(req, res) {
  var name = req.body.name;
  var desc = req.body.desc;

  categoryHelper.create({
    name: name,
    author: req.user._id,
    description: desc,
    tags: []
  }).then(function(category) {
    handler.send(res, category);
  }).catch(function(err) {
    var msg = '服务器连接失败，请稍后重试';
    if (err && /duplicate/ig.test(err.errmsg)) {
      msg = '该分类已存在';
    }

    handler.handleError(res, msg);
  });
};
