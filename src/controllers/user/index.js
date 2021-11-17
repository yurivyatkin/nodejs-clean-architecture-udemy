const addUserController = require('./addUser.controller');

module.exports = (dependencies) => {
  return {
    addUserController: addUserController(dependencies),
  };
};
