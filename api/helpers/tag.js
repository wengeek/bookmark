'use strict';

var Tag = require('../models/tag');

exports.create = function(params) {
  return new Promise(function(resolve, reject) {
    Tag.create(params, function (err, tag) {
      if (err) {
        return reject(err);
      }
      resolve(tag);
    });
  });
};

exports.findAll = function(params) {
  return new Promise(function(resolve, reject) {
    Tag.find(params).populate('bookmarks').exec(function(err, tags) {
      if (err) {
        return reject(err);
      }
      resolve(tags);
    });
  })
};

exports.findAllWithNotEmpty = function(params) {
  return new Promise(function(resolve, reject) {
    var condition = params;
    condition.bookmarks = {$exists: true, $not: {$size: 0}};
    Tag.find(condition).populate('bookmarks').exec(function(err, tags) {
      if (err) {
        return reject(err);
      }

      resolve(tags);
    });
  });
};

exports.findOne = function(params) {
  return new Promise(function(resolve, reject) {
    Tag.findOne(params).exec(function(err, tag) {
      if (err) {
        return reject(err);
      }

      resolve(tag);
    });
  });
};

