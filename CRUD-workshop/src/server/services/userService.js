const User = require('../models/user');

async function getUserByToken(token) {
  const { _id } = token;
  const user = User.findOne({ _id });

  if (!user) {
    throw new Error('User not found!');
  }

  return user;
}

module.exports = {
  getUserByToken
}
