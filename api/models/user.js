'use strict';
/**
 * 用户数据表 
 */

var mongoose = require('mongoose');
var userPlugin = require('mongoose-user');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {type: String, default: '', unique: true},
  email: {type: String, default: '', unique: true},
  hashed_password: {type: String, default: ''},
  salt: {type: String, default: ''},
  createTime: {type: Date, default: Date.now}
});

UserSchema.plugin(userPlugin, {});

module.exports = mongoose.model('User', UserSchema);
