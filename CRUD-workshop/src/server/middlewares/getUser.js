const UserService = require('../services/userService');

module.exports = async function (req, res, next) {
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

  req.user = user;
  next();
}
