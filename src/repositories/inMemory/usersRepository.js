const { v4: uuidV4 } = require('uuid');

const { inMemory: inMemoryDb } = require('../../frameworks/database');

module.exports = {
  add: async (user) => {
    if (!user.id) {
      user.id = uuidV4();
    }
    inMemoryDb.users.push(user);
    return user;
  },
  update: async (user) => {
    const index = inMemoryDb.users.findIndex((item) => item.id === user.id);
    if (index >= 0) {
      inMemoryDb.users[index] = user;
      return inMemoryDb.users[index];
    }
    return null;
  },
  delete: async (user) => {
    const index = inMemoryDb.users.findIndex((item) => item.id === user.id);
    if (index >= 0) {
      inMemoryDb.users.splice(index, 0);
      return user;
    }
    return null;
  },
  getById: async (id) => {
    return inMemoryDb.users.find((item) => item.id === user.id);
  },
};
