'use strict';

var Category = require('../models/category');

exports.create = function(params) {
  return new Promise(function(resolve, reject) {
    Category.create(params, function (err, category) {
      if (err) {
        return reject(err);
      }
      resolve(category);
    });
  });
};

exports.findAll = function(params) {
  return new Promise(function(resolve, reject) {
    Category.find(params).sort({created: 1}).populate('tags').exec(function(err, categories) {
      if (err) {
        return reject(err);
      }
      resolve(categories);
    });
  });
};

exports.findAllWithSubDoc = function(params) {
  return new Promise(function(resolve, reject) {
    Category.find(params).sort({created: 1}).populate('tags').populate({
      path: 'tags',
      populate: {
        path: 'bookmarks',
        model: 'Bookmark'
      }
    }).exec(function(err, categories) {
      if (err) {
        return reject(err);
      }
      resolve(categories);
    });
  });
};

exports.findOne = function(params) {
  return new Promise(function(resolve, reject) {
    Category.findOne(params).populate('tag').exec(function(err, category) {
      if (err) {
        return reject(err);
      }
      resolve(category);
    });
  });
};

exports.findOneById = function(categoryId) {
  return new Promise(function(resolve, reject) {
    Category.findOne({_id: categoryId}).populate('tags').populate({
      path: 'tags',
      populate: {
        path: 'bookmarks',
        model: 'Bookmark'
      }
    }).exec(function(err, category) {
      if (err) {
        return reject(err);
      }

      if (!category) {
        reject('该分类不存在');
      }

      resolve(category);
    });
  });
};

