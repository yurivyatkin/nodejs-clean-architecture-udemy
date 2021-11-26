const addProductController = require('./addProduct.controller');

module.exports = (dependencies) => {
  return {
    addProductController: addProductController(dependencies),
  };
};
