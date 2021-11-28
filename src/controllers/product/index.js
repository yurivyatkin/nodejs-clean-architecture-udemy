const addProductController = require('./addProduct.controller');
const getProductByIdController = require('./getProductById.controller');

module.exports = (dependencies) => {
  return {
    addProductController: addProductController(dependencies),
    getProductByIdController: getProductByIdController(dependencies),
  };
};
