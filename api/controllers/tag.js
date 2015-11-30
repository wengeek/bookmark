var tagHelper = require('../helpers/tag');
var categoryHelper = require('../helpers/category');
var handler = require('../utils/handler');
var rtn = require('../utils/rtn');

/**
 * 获取所有书签类别
 * categoryId 分类标示符
 */
exports.index = function(req, res) {
  var categoryId = req.params.categoryId;

  if (categoryId) {
    tagHelper.findAllWithNotEmpty({category: categoryId}).then(function(tags) {
      handler.send(res, tags);
    }).catch(function(err) {
      handler.handleError(res, 'server error');
    });
  } else {
    handler.handleError(res, 'categoryId cannot be found');
  }
};

/**
 * 添加标签类别
 * 请求类型：POST
 * name: 类别名称
 * desc: 类别描述
 * category：所属分类
 */
exports.add = function(req, res) {
  var name = req.body.name;
  var desc = req.body.desc;
  var category = req.body.category;

  categoryHelper.findOne({_id: category}).then(function(category) {
    if (!category) {
      return handler.handleError(res, '分类不存在， 请重新选择');
    }

    tagHelper.create({
      name: name,
      author: req.user._id,
      description: desc,
      category: category,
      bookmarks: []
    }).then(function(tag) {
      category.tags.push(tag._id);
      category.save();

      handler.send(res, tag);
    }).catch(function(err) {
      var msg = '服务器连接失败，请稍后重试';
      if (err && /duplicate/ig.test(err.errmsg)) {
        msg = '该标签已存在';
      }

      handler.handleError(res, msg);
    });
  });
};
