const UserService = require('../services/userService');

async function getCurrentUser(req, res, next) {
  const { token } = req;

  let user;
  try {
    user = await UserService.getUserByToken(token);
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }

  return res.json({login: user.login});
}

module.exports = {
  getCurrentUser
}
