const { v4: uuidV4 } = require('uuid');

const { inMemory: inMemoryDb } = require('../../frameworks/database');

module.exports = {
  add: async (order) => {
    if (!order.id) {
      order.id = uuidV4();
    }
    inMemoryDb.orders.push(order);
    return order;
  },
  update: async (order) => {
    const index = inMemoryDb.orders.findIndex((item) => item.id === order.id);
    if (index >= 0) {
      inMemoryDb.orders[index] = order;
      return inMemoryDb.orders[index];
    }
    return null;
  },
  delete: async (order) => {
    const index = inMemoryDb.orders.findIndex((item) => item.id === order.id);
    if (index >= 0) {
      inMemoryDb.orders.splice(index, 1);
      return order;
    }
    return null;
  },
  getById: async (id) => {
    return inMemoryDb.orders.find((item) => item.id === id);
  },
};
