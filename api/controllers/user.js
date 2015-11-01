var passport = require('passport');
var userHelper = require('../helpers/user');
var utils = require('../utils');
var rtn = require('../utils/rtn');

exports.register = function(req, res) {
	userHelper.create({
		email: req.body.email,
		name: req.body.username,
		password: req.body.password
	}).then(function(account) {
		passport.authenticate('local')(req, res, function () {
			res.status(200).json({
				rtn: rtn.SUCCESS
			});
		});
	}).catch(function(err) {
		return utils.handleError(res, err.errmsg);
	});
};

exports.login = function(req, res) {
	passport.authenticate('local', function(err, user, info) {
		if(err) {
			util.handleError(err);
		}
		if(!user) {
			return res.status(200).json({
				rtn: rtn.NO_USER,
				msg: 'User is not existed'
			});
		}

		console.log(user);
		console.log(info);
		res.status(200).json({
			rtn: rtn.SUCCESS
		});
  })(req, res, next);
};

exports.getUsers = function(req, res) {
	userHelper.findAll().then(function(users) {
		res.status(200).json({
			rtn: 0,
			data: users
		});
	});
}
