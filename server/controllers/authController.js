const logger = require('../lib/logging');
const {to, ReE, ReS, TE} = require('../services/util.service');
const {userSchema} = require('../models');
const bcrypt = require('bcrypt');

const register = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let body = req.body;
    // console.log(body);
    let err, user;
    if (!body.firstname){
        logger.error("Auth Controller - register - firstname not entered");
        return ReE(res, new Error("Enter your first name"), 422);
    }
    if (!body.lastname){
        logger.error("Auth Controller - register - lastname not entered");
        return ReE(res, new Error("Enter your last name"), 422);
    }
    if (!body.username){
        logger.error("Auth Controller - register - username not entered");
        return ReE(res, new Error("Enter your user name"), 422);
    }
    if (!body.password){
        logger.error("Auth Controller - register - password not entered");
        return ReE(res, new Error("Enter your password"), 422);
    }
    // if (!body.livesIn){
    //     logger.error("Auth Controller - register - livesIn not entered");
    //     return ReE(res, new Error("Enter livesIn value"), 422);
    // }
    let salt = await bcrypt.genSalt(10);
    let securedPassword = await bcrypt.hash(body.password, salt);
    body.password=securedPassword;
    // console.log(salt);
    // console.log(securedPassword);
    // var userInstance = {
    //     firstname : body.firstname,
    //     lastname : body.lastname,
    //     username : body.username,
    //     password : securedPassword,
    //     // livesIn : body.livesIn
    // }
    // console.log(userInstance);
    [err, user] = await to(userSchema.create(body));
    // console.log(err,user);
    if (err){
        logger.error("Auth Controller - register - User could not be created");
        return ReE(res, err, 422);
    }
    // console.log(user);
    return ReS(res, {message: "Successfully created new user", user: user.toObject()}, 201);
}
module.exports.register = register;

const login = async function(req, res){
    let username = req.body.username;
    let password = req.body.password;
    if (!username){
        logger.error("Auth Controller - login - username not entered");
        return ReE(res, new Error("Enter the username"));
    }
    if (!password){
        logger.error("Auth Controller - login - password not entered");
        return ReE(res, new Error("Enter the password"), 422);
    }
    let err, user;
    [err, user] = await to(userSchema.findOne({'username' : username}));
    if (err){
        logger.error("Auth Controller - login - could not find the user");
        return ReE(res, err, 404);
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        logger.error("Auth Controller - login - Password not matched");
        return ReE(res, new Error("Credentials not matched"), 401);
    }
    return ReS(res, {message: "Successfully logged in", _id:user._id});
}
module.exports.login = login;