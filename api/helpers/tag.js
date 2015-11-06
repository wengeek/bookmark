'use strict';

var Tag = require('../models/tag');

exports.create = function(params) {
  return new Promise(function(resolve, reject) {
    Tag.create(params, function (err, tag) {
      if(err) {
        return reject(err);
      }
      resolve(tag);
    });
  });
};

exports.findAll = function(params) {
  return new Promise(function(resolve, reject) {
    Tag.find(params).populate('Bookmark').exec(function(err, users) {
      if(err) {
        return reject(err);
      }
      resolve(users);
    });
  })
};
