const USERS = [{
  login: 'admin',
  password: 'admin'
}];

module.exports = {
  comparePasswords: (user, password) => user.password === password,
  findOne: ({ _id, login }) => USERS.find(user => user.login === login || user._id === _id),
  create: ({login, password}) => {
    if (!login || !password) {
      return false;
    }

    const user = USERS.find(u => u.login === login);
    if (user) {
      return false;
    }

    const newUser = {login, password, _id: Math.floor(Math.random() * 1000)};
    USERS.push(newUser);
    return newUser;
  }
};
