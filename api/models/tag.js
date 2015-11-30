'use strict';
/**
 * 分类表结构
 */

var mongoose = require('mongoose');
var lastMod = require('../utils/mongoose-lastmod');
var Schema = mongoose.Schema;

var TagSchema = new Schema({
  name: {type: String, default:''},
  description: {type: String, default: ''},
  created: {type: Date, default: Date.now},
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  category: {type: Schema.Types.ObjectId, ref: 'Category'},
  bookmarks: [{type: Schema.Types.ObjectId, ref: 'Bookmark'}]
});

TagSchema.index({name: 1, category: 1}, {unique: true});

TagSchema.plugin(lastMod);

module.exports = mongoose.model('Tag', TagSchema);
