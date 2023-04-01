const logger = require('../lib/logging');
const {to, ReE, ReS, TE} = require('../services/util.service');
const Post = require("../models/postSchema");

const create = async function(req, res){
    let body = req.body;
    let err, post;
    if (!body.id){
        logger.error("Post Controller - create - userId can't be empty");
        return ReE(res, new Error("Enter a userId"), 422);
    }
    if (!body.description){
        logger.error("Post Controller - create - description can't be empty");
        return ReE(res, new Error("Enter description"), 422);
    }
    var postInstance = {
        userid: body.userid,
        description: body.description,
        image: body.image
    }
    [err, post] = await to(Post.create(postInstance));
    if (err) {
		logger.error("Post Controller - create - Post could not be created", err);
		return ReE(res, err, 422);
	}
	return ReS(res, { message: 'Successfully created new Post.', post: post.toObject() }, 201);

}
module.exports.create = create;

const get = async function(req, res){
    let id = req.body._id;
    let err, post;
    if (!id){
        logger.error("Post Controller - get - Id not entered");
        return ReE(res, new Error("Enter the id"), 422);
    }
    [err, post] = await to(Post.findById(id));
    if (err || !post){
        logger.error("Post Controller - get - post not found");
        return ReE(res, err, 422);
    }
    return ReS(res, {post: post.toObject()});
}
module.exports.get = get;

const update = async function(req, res){
    let id = req.body._id;
    if (!id){
        logger.error("Post Controller - update - id not entered");
        return ReE(res, new Error("Enter the id"), 422);
    }
    let err, post;
    [err, post] = await to(Post.findById(id));
    if (err || !post){
        logger.error("Post controller - update - post not found");
        return ReE(res, err, 422);
    }
    post.userid = req.body.userid;
    post.description = req.body.description;
    post.likes = req.body.likes;
    post.image = req.body.image;
    let updatedPost;
    [err, updatedPost] = await to(post.save());
    if (err){
        logger.error("Post Controller - update - Post could not be updated");
        return ReE(res, err, 422);
    }
    return ReS(res, { message: 'Updated Post: ' + post.userId });
}
module.exports.update = update;

const del = async function(req, res){
    let id = req.body._id;
    if (!id){
        logger.error("Post Controller - delete - id not entered");
        return ReE(res, new Error("Enter the id"), 422);
    }
    let err, post;
    [err, post] = await to(Post.findById(id));
    if (err || !post){
        logger.error("Post controller - update - post not found");
        return ReE(res, err, 422);
    }
    let deletedPost;
    [err, deletedPost] = await to(post.delete());
    if (err){
        logger.error("Post Controller - delete - Post could not be deleted");
        return ReE(res, err, 422);
    }
    return ReS(res, {message: "Deleted Post"});
}
module.exports.del = del;