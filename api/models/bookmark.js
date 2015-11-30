'use strict';
/**
 * 标签表结构
 */
var mongoose = require('mongoose');
var lastMod = require('../utils/mongoose-lastmod');
var Schema = mongoose.Schema;

var BookmarkSchema = new Schema({
  name: {type: String, default: '', unique: true},
  url: {type: String, default: ''},
  description: {type: String, default: ''},
  created: {type: Date, default: Date.now},
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  category: {type: Schema.Types.ObjectId, ref: 'Category'},
  tag: {type: Schema.Types.ObjectId, ref: 'Tag'}
});

BookmarkSchema.index({name: 1, tag: 1}, {unique: true});

BookmarkSchema.plugin(lastMod);

module.exports = mongoose.model('Bookmark', BookmarkSchema);
