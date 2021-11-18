const addUserController = require('./addUser.controller');
const getUserByIdController = require('./getUserById.controller');

module.exports = (dependencies) => {
  return {
    addUserController: addUserController(dependencies),
    getUserByIdController: getUserByIdController(dependencies),
  };
};
