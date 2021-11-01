const { v4: uuidV4 } = require('uuid');

const { inMemory: inMemoryDb } = require('../../frameworks/database');

module.exports = {
  add: async (product) => {
    if (!product.id) {
      product.id = uuidV4();
    }
    inMemoryDb.products.push(product);
    return product;
  },
  update: async (product) => {
    const index = inMemoryDb.products.findIndex(
      (item) => item.id === product.id
    );
    if (index >= 0) {
      inMemoryDb.products[index] = product;
      return inMemoryDb.products[index];
    }
    return null;
  },
  delete: async (product) => {
    const index = inMemoryDb.products.findIndex(
      (item) => item.id === product.id
    );
    if (index >= 0) {
      inMemoryDb.products.splice(index, 1);
      return product;
    }
    return null;
  },
  getById: async (id) => {
    return inMemoryDb.products.find((item) => item.id === id);
  },
};
