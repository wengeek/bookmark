var rtn = require('./rtn');
/**
 * 错误信息处理
 */
exports.handleError = function(res, err) {
	return res.status(200).json({
		rtn: rtn.ERROR,
		msg: err
	});
};
