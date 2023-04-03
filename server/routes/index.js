var express = require('express');
var router = express.Router();
const PostController = require('../controllers/postController');
const AuthController = require('../controllers/authController');

router.post('/post/create', PostController.create);
router.get('/post', PostController.get);
router.put('/post/update', PostController.update);
router.delete('/post/delete', PostController.del);
router.put('/post/like', PostController.like);

router.post('/auth/register', AuthController.register);
router.get('/auth/login', AuthController.login);

module.exports = router;
