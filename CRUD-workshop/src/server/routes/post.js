const express = require('express');
const checkToken = require('../middlewares/checkToken');
const getUser = require('../middlewares/getUser');

const PostController = require('../controllers/post');

const router = express.Router();

router.get('/posts', PostController.getAll);
router.get('/posts/:url', PostController.getPostByUrl);
router.post('/posts', checkToken, getUser, PostController.create);
router.patch('/posts/:id', checkToken, PostController.updatePost);
router.delete('/posts/:id', checkToken, PostController.deletePost);

module.exports = router;
