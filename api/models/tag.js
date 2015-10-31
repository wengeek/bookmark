'use strict';
/**
 * 线上版本
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RevSchema = new Schema({
  createTime: {type: Date, default: Date.now},
  app: {type: String, ref: 'App'},
  module: {type: String, ref: 'Mod'},
  rev: Schema.Types.Mixed
});

module.exports = mongoose.model('rev', RevSchema);
