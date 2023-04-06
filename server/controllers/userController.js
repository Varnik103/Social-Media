const { to, ReE, ReS } = require('../services/util.service');
const { userSchema } = require('../models');
const logger = require('../lib/logging');

const get = async function (req, res) {
	let user_id, err, user;
	if (!req.query._id) {
		logger.error("userSchema Controller - get : user Id is empty");
		return ReE(res, new Error('user Id is empty'), 422);
	}

	user_id = req.query._id;

	[err,user] = await to(findByPk(user_id));
	if (err) {
		logger.error("User Controller - get : User not found", err);
		return ReE(res, err, 422);
	}

	res.setHeader('Content-Type', 'application/json');

	return ReS(res, { user: user.toObject() });
}
module.exports.get = get;

const findByPk = async function (id) {
	let user_id, err,user;
	user_id = id;

	[err, user] = await to(userSchema.findById(user_id));

	if (err || !user) {
		logger.error("user Controller - findbypk : user not found");
		throw new Error(" not found");
	}
	return user;
}
module.exports.findUserById = findByPk;

const list = async function (req, res) {

	let userList, userCount, err;
	var limit = req.query.limit ? (req.query.limit < 20 && req.query.limit > 0) ? parseInt(req.query.limit) : 20 : 20;
	var offset = req.query.offset ? req.query.offset > 0 ? parseInt(req.query.offset) : 0 : 0;

	var search = {};
	var isAdmin = [];
	if (req.query.search) {
		search = req.query.search;
		search = JSON.parse(search)
	}
	if (req.query.isAdmin) {
		isAdmin = req.query.isAdmin;
		isAdmin = JSON.parse(isAdmin);
	}
	[err, userList] = await to(userSchema.find().sort(isAdmin).limit(limit).skip(offset));
	if (err) {
		logger.error("user Controller - list : user could not be fetched", err);
		return ReE(res, err, 422);
	}
	[err, userCount] = await to(userSchema.find().count());
	if (err) {
		logger.error("user Controller - list : user count could not be fetched", err);
		return ReE(res, err, 422);
	}

	res.setHeader('Content-Type', 'application/json');
	return ReS(res, { user: JSON.stringify(userList), count: userCount });
}
module.exports.list = list;


const update = async function (req, res) {
	let user_id, err, user, saveduser;
	if (!req.body._id) {
		logger.error("user Controller - update : user Id is empty");
		return ReE(res, new Error('user Id is empty.'), 422);
	}
	user_id = req.body._id;

	[err,user] = await to(findByPk(user_id));
	if (err) {
		logger.error("user Controller - update : user not found", err);
		return ReE(res, err, 422);
	}
	if (req.body.username) user.username = req.body.username;
	if (req.body.password) user.password = req.body.password;
	if (req.body.firstname) user.firstname = req.body.firstname;
    if (req.body.lastname) user.lastname = req.body.lastname;
	if (req.body.profilePicture) user.profilePicture = req.body.templeId;
	if (req.body.coverPicture) user.coverPicture = req.body.coverPicture;
	if (req.body.livesIn) user.livesIn = req.body.livesIn;
	if (req.body.worksAt) user.worksAt = req.body.worksAt;
	[err, saveduser] = await to(user.save());
	if (err) {
		logger.error("user Controller - update : user could not be updated", err);
		return ReE(res, err, 422);
	}
	return ReS(res, { message: 'Updated user: ' + user.firstname });
}
module.exports.update = update;