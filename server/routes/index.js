var express = require('express');
var router = express.Router();
const PostController = require('../controllers/postController');
const UserController = require('../controllers/userController');
const AuthController = require('../controllers/authController');

router.post('/post/create', PostController.create);
router.get('/post', PostController.get);
router.put('/post/update', PostController.update);
router.delete('/post/delete', PostController.del);
router.put('/post/like', PostController.like);
router.get('/post/getTimeline', PostController.getTimelinePosts);

router.post('/auth/register', AuthController.register);
router.get('/auth/login', AuthController.login);

router.get('/user',UserController.get);
router.get('/user/list',UserController.list);
router.put('/user/update', UserController.update);

module.exports = router;
