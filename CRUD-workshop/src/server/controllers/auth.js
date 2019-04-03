const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config');

const signup = async (req, res, next) => {
  const credentials = req.body;

  if (credentials.key !== config.createKey) {
    res.json({ error: 'Incorrect key!' });
  }

  const user = User.create(credentials);
  if (!user) {
    return next({
      status: 500,
      message: 'Internal server error!'
    });
  }

  res.json(user);
}

const signin = async (req, res, next) => {
  const { login, password } = req.body;

  const user = User.findOne({ login });

  if (!user) {
    return next({
      status: 400,
      message: 'User not found!'
    });
  }

  const compareResult = User.comparePasswords(user, password);
  if (!compareResult) {
    return next({
      status: 400,
      message: 'Bad credentials!'
    });
  }

  const token = jwt.sign({ _id: user._id }, config.secret);
  res.json(token);
}

module.exports = {
  signin,
  signup
};
