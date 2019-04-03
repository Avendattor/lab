const express = require('express');
const AuthController = require('../controllers/auth');
const UserController = require('../controllers/user');

const router = express.Router();

router.post('/signup', AuthController.signup);
router.post('/signin', AuthController.signin);
router.get('/user', UserController.getCurrentUser);

module.exports = router;
