const fetch = require('node-fetch');
const Post = require('../models/post');
const config = require('../config/');

async function create(req, res, next) {
  const postData = req.body;

  const post = Post.create(postData);
  if (!post) {
    return next({
      status: 400,
      message: 'Internal server error'
    });
  }

  return res.json(post);
}

async function getAll(req, res, next) {
  const posts = Post.getAll();
  return res.json(posts);

}

async function getPostByUrl(req, res, next) {
  const { url } = req.params;

  const post = Post.findOne({ url });
  if (!post) {
    return next({
      status: 404,
      message: 'Post not found'
    });
  }

  return res.json(post);
}

async function deletePost(req, res, next) {
  const _id = req.params.id;

  const post = Post.findOne({ _id });
  if (!post) {
    return next({
      status: 404,
      message: 'Post not found'
    });
  }

  if (!Post.remove(_id)) {
    return next({
      status: 500,
      message: 'Internal server error'
    });
  }

  return res.json({ message: 'success delete' });
}

async function updatePost(req, res, next) {
  const _id = req.params.id;
  const postData = req.body;

  let post = Post.findOne({ _id });

  if (!post) {
    return next({
      status: 404,
      message: 'Post not found!'
    });
  }

  const upd = Post.findOneAndUpdate({ _id }, {
    ...post,
    ...postData,
  });
  post = Post.findOne({ _id });

  return res.json(post);
}

module.exports = {
  updatePost,
  deletePost,
  getAll,
  getPostByUrl,
  create
};
