const Chance = require('chance');

const { usersRepository } = require('../../../src/repositories/inMemory');

const {
  User,
  constants: {
    userConstants: { genders },
  },
} = require('../../../src/entities');

const chance = new Chance();

describe('Users repository', () => {
  test('New user should be added and returned', async () => {
    const testUser = new User({
      name: chance.name(),
      lastName: chance.last(),
      gender: genders.FEMALE,
      meta: {
        hair: { color: 'black' },
      },
    });
    const addedUser = await usersRepository.add(testUser);
    expect(addedUser).toBeDefined();
    expect(addedUser.id).toBeDefined();
    expect(addedUser.name).toBe(testUser.name);
    expect(addedUser.lastName).toBe(testUser.lastName);
    expect(addedUser.gender).toBe(testUser.gender);
    expect(addedUser.meta).toBe(testUser.meta);

    const returnedUser = await usersRepository.getById(addedUser.id);
    expect(returnedUser).toEqual(addedUser);
  });
  test('New user should be deleted', async () => {});
  test('New user should be updated', async () => {});
});
