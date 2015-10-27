'use strict';
/**
 * 路由设置
 */
var express = require('express');
var Tag = require('./controllers/tag.controller');
var router = express.Router();

router.get('/tags', Tag.index);

router.get('*', function(req, res) {
	res.status(404).json({
		rtn: 404
	});
});

module.exports = router;
