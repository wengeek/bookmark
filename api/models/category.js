'use strict';
/**
 * 分类表结构
 */

var mongoose = require('mongoose');
var lastMod = require('../utils/mongoose-lastmod');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: {type: String, default: '', unique: true},
  created: {type: Date, default: Date.now},
  description: {type: String, default: ''},
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}]
});

CategorySchema.plugin(lastMod);

module.exports = mongoose.model('Category', CategorySchema);
