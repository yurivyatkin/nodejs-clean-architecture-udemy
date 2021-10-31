const Chance = require('chance');
const { cloneDeep } = require('lodash');

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
  test('New user should be deleted', async () => {
    // init two users
    const firstUser = new User({
      name: chance.name(),
      lastName: chance.last(),
      gender: genders.FEMALE,
      meta: {
        hair: { color: 'black' },
      },
    });

    const secondUser = new User({
      name: chance.name(),
      lastName: chance.last(),
      gender: genders.MALE,
      meta: {
        hair: { color: 'grey' },
      },
    });
    // add the two users
    const [firstAddedUser, secondAddedUser] = await Promise.all([
      usersRepository.add(firstUser),
      usersRepository.add(secondUser),
    ]);
    expect(firstAddedUser).toBeDefined();
    expect(secondAddedUser).toBeDefined();
    // delete the first user
    const deletedUser = await usersRepository.delete(firstAddedUser);
    expect(deletedUser).toEqual(firstAddedUser);
    // try to get the deleted user (should be undefined)
    const shouldBeUndefinedUser = await usersRepository.getById(deletedUser.id);
    expect(shouldBeUndefinedUser).toBeUndefined();
    // check that the second user is defined (not deleted)
    const shouldBeDefinedUser = await usersRepository.getById(
      secondAddedUser.id
    );
    expect(shouldBeDefinedUser).toBeDefined();
  });
  test('New user should be updated', async () => {
    // add a user
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
    // update the user
    const clonedUser = cloneDeep({
      ...addedUser,
      name: chance.name,
      gender: genders.MALE,
    });
    const updatedUser = await usersRepository.update(clonedUser);
    expect(updatedUser).toEqual(clonedUser);
  });
});
