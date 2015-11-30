var handler = require('../utils/handler');
var rtn = require('../utils/rtn');
var tagHelper = require('../helpers/tag');
var bookmarkHelper = require('../helpers/bookmark');

/**
 * 添加书签
 * 请求类型：POST
 * name 书签名称
 * desc 书签描述
 * tag 书签类别
 * url 书签地址
 */
exports.add = function(req, res) {
  var name = req.body.name;
  var desc = req.body.desc;
  var tag = req.body.tag;
  var url = req.body.url;

  function onCreateBookmark(tag) {
    return bookmarkHelper.create({
      name: name,
      url: url,
      description: desc,
      author: req.user._id,
      tag: tag,
      category: tag.category
    }).then(function(bookmark) {
      return onUpdateTag(tag, bookmark);
    });
  }

  function onUpdateTag(tag, bookmark) {
    if (tag.bookmarks.indexOf(bookmark) === -1) {
      tag.bookmarks.push(bookmark);
      tag.save();
    }
    return bookmark;
  }

  tagHelper.findOne({_id: tag}).then(onCreateBookmark).then(function(bookmark) {
    handler.send(res, bookmark);
  }).catch(function(err) {
    var msg = '服务器连接失败，请稍后重试';
    if (err && /duplicate/ig.test(err.errmsg)) {
      msg = '该书签已存在';
    }

    handler.handleError(res, msg);
  });
};
