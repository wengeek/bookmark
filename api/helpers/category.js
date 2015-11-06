'use strict';

var User = require('../models/user');

exports.create = function(params) {
  return new Promise(function(resolve, reject) {
    User.create(params, function (err, user) {
      if(err) {
        return reject(err);
      }
      resolve(user);
    });
  });
};

exports.findAll = function(params) {
  return new Promise(function(resolve, reject) {
    User.find().exec(function(err, users) {
      if(err) {
        return reject(err);
      }
      resolve(users);
    });
  })
};
