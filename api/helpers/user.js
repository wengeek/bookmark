'use strict';

var User = require('../models/user.model');

exports.create = function (params) {
  return new Promise(function (resolve, reject) {
    User.create(params, function (err, app) {
      if (err) {
        return reject(err);
      }
      resolve(app);
    });
  });
};
