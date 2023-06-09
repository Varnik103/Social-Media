const logger = require('../lib/logging');
const {to, ReE, ReS, TE} = require('../services/util.service');
const {postSchema} = require("../models");
const {userSchema} = require("../models");
const mongoose = require('mongoose');
const multer = require('multer');
const uploadFile = require("../middleware/upload");


const create = async function(req, res){
    let body = req.body;
	// console.log(body);
    let err, post;
    if (!body.userid){
        logger.error("Post Controller - create - userId can't be empty");
        return ReE(res, new Error("Enter a userId"), 422);
    }
    if (!body.image){
        logger.error("Post Controller - create - image can't be empty");
        return ReE(res, new Error("Enter image"), 422);
    }
    // var postInstance = {
    //     userid: body.id,
    //     description: body.description,
    //     image: body.image
    // }
    [err, post] = await to(postSchema.create(body));
    if (err) {
		logger.error("Post Controller - create - Post could not be created", err);
		return ReE(res, err, 422);
	}
	return ReS(res, { message: 'Successfully created new Post.', post: post.toObject() }, 201);

}
module.exports.create = create;

const get = async function(req, res){
    let id = req.query._id;
    let err, post;
    if (!id){
        logger.error("Post Controller - get - Id not entered");
        return ReE(res, new Error("Enter the id"), 422);
    }
    [err, post] = await to(postSchema.findById(id));
    if (err || !post){
        logger.error("Post Controller - get - post not found");
        return ReE(res, err, 422);
    }
    return ReS(res, {post: post.toObject()});
}
module.exports.get = get;

const update = async function(req, res){
    let id = req.query._id;
    if (!id){
        logger.error("Post Controller - update - id not entered");
        return ReE(res, new Error("Enter the id"), 422);
    }
    let err, post;
    [err, post] = await to(postSchema.findById(id));
    if (err || !post){
        logger.error("Post controller - update - post not found");
        return ReE(res, err, 422);
    }
	const userId = req.body.userid;
	// console.log(post, userId);
	if(post.userid === userId){
		// post.userid = req.body.userid;
		post.description = req.body.description;
		post.likes = req.body.likes;
		post.image = req.body.image;
		let updatedPost;
		[err, updatedPost] = await to(post.save());
		if (err){
			logger.error("Post Controller - update - Post could not be updated");
			return ReE(res, err, 422);
		}
	}
	else{
		// logger.error("Post Controller - update - Action forbidden");
		return ReE(res, "Action Forbidden", 403);
	}
    return ReS(res, { message: 'Updated Post: ' + post.userid });
}
module.exports.update = update;

const del = async function(req, res){
    let id = req.query._id;
    if (!id){
        logger.error("Post Controller - delete - id not entered");
        return ReE(res, new Error("Enter the id"), 422);
    }
    let err, post;
    [err, post] = await to(postSchema.findById(id));
	console.log(err,post);
    if (err || !post){
        logger.error("Post controller - delete - post not found");
        return ReE(res, err, 422);
    }
	const userId = req.body.userid;
	if(post.userid === userId){
		let deletedPost;
		[err, deletedPost] = await to(post.deleteOne());
		if (err){
			logger.error("Post Controller - delete - Post could not be deleted");
			return ReE(res, err, 422);
		}
	}
	else{
		// logger.error("Post Controller - update - Action forbidden");
		return ReE(res, "Action Forbidden", 403);
	}
    
    return ReS(res, {message: "Deleted Post"});
}
module.exports.del = del;

const like = async function(req, res){
    let postId = req.query._id;
    let userId = req.body._id;
    if (!postId){
        logger.error("Post Controller - like - Post id not entered");
        return ReE(res, new Error("Enter the Post id"), 422);
    }
    if (!userId){
        logger.error("Post Controller - like - User id not entered");
        return ReE(res, new Error("Enter the User id"), 422);
    }
    let err, post;
    [err, post] = await to(postSchema.findById(postId));
    if (err || !post){
        logger.error("Post controller - like - post not found");
        return ReE(res, err, 422);
    }
	try{
		if(!post.likes.includes(userId)){
			await post.updateOne({$push : {likes : userId}})
			return ReS(res, {message: "Successfully liked"});
		}
		else{
			await post.updateOne({$pull : {likes : userId}})
			return ReS(res, {message: "Successfully disliked"});
		}
	}
	catch (error){
		return ReE(res, "Like/Dislike Unsuccessful", 422);
	}
    // let likesArray = post.likes;
    // console.log(likesArray);
    // likesArray.push(userId);
    // let count=0;
    // for (let index = 0; index < likesArray.length; index++) {
    //     let element = likesArray[index];
    //     if (element == userId){
    //         count++;
    //     }
    // }
    // if (count == 2){
    //     for (let index = 0; index < likesArray.length; index++) {
    //         let element = likesArray[index];
    //         if (element == userId){
    //             likesArray.splice(index,1);
    //         }
    //     }
    //     return ReS(res, {message: "Successfully disliked"});
    // }
    // else{
    //     return ReS(res, {message: "Successfully liked"});
    // }
}
module.exports.like = like;

const getTimelinePosts = async function(req, res){
    // console.log(req.query);
    let userId = req.query.id;
    if (!userId){
        logger.error("Post Controller - getTimelinePosts - User id not entered");
        return ReE(res, new Error("Enter the User id"), 422);
    }
	let err, user;
    [err, user] = await to(userSchema.findById(userId));
    if (err || !user){
        logger.error("Post controller - getTimelinePosts - user not found");
        return ReE(res, err, 422);
    }
		let currentserpost;
		[err, currentserpost] = await to(postSchema.find({userid : userId}));
		if (err){
			logger.error("Post controller - getTimelinePosts - currentserpost not found");
			return ReE(res, err, 422);
		}
		let followingposts;
		[err, followingposts] = await to(userSchema.aggregate([
			{
				$match: {
					_id: new mongoose.Types.ObjectId(userId)
				}
			},
			{
				$lookup: {
					from: "postschemas",
					localField: "following",
					foreignField: "userid",
					as: "followingposts"
				}
			},
			{
				$project: {
					followingposts: 1,
					_id: 0
				}
			}
		]));
        // console.log(followingposts);
		if (err){
			logger.error("Post controller - getTimelinePosts - followingposts not found");
			return ReE(res, err, 422);
		}
		return ReS(res, {timeline : currentserpost.concat(...followingposts[0].followingposts).sort((a,b)=> {
			return b.createdAt-a.createdAt;
		})});
}
module.exports.getTimelinePosts = getTimelinePosts;

const upload = async (req, res) => {
    try {
      await uploadFile(req, res);
  
      if (req.file == undefined) {
        return res.status(400).send({ message: "Please upload a file!" });
      }
  
      res.status(200).send({
        message: "Uploaded the file successfully: " + req.file.originalname,
      });
    } catch (err) {
      res.status(500).send({
        message: `Could not upload the file: ${req.file.originalname}. ${err}`,
      });
    }
  };
module.exports.upload = upload;
