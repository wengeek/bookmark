'use strict';
var Bookmark = require('../models/bookmark');

exports.create = function(params) {
  return new Promise(function(resolve, reject) {
    Bookmark.create(params, function(err, bookmark) {
      if (err) {
        return reject(err);
      }

      resolve(bookmark);
    });
  });
};

exports.findAll = function(params) {
  return new Promise(function(resolve, reject) {
    Bookmark.find(params).sort({created: 1}).exec(function(err, bookmarks) {
      if (err) {
        return reject(err);
      }

      resolve(bookmarks);
    });
  });
};
