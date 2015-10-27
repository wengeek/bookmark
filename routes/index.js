/**
 * 后端API路由设置
 * @param  {Object} app
 */
module.exports = function(app) {
	app.use('/api', require('./api'));
};