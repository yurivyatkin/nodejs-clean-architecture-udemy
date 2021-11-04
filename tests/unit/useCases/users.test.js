const Chance = require('chance');

const { v4: uuidv4 } = require('uuid');

const {
  user: { addUserUseCase },
} = require('../../../src/useCases');

const {
  User,
  constants: {
    userConstants: { genders },
  },
} = require('../../../src/entities');

const chance = new Chance();

describe('User Use Cases', () => {
  const mockUserRepo = {
    add: jest.fn(async (user) => ({
      ...user,
      id: uuidv4(),
    })),
  };

  const dependencies = {
    usersRepository: mockUserRepo,
  };

  describe('Add user use case', () => {
    it('should add the user using the given repository', async () => {
      // create user data
      const testUserData = new User({
        name: chance.name(),
        lastName: chance.last(),
        gender: genders.MALE,
        meta: {
          hair: {
            color: 'red',
          },
        },
      });
      // add a user using the use case
      const addedUser = await addUserUseCase(dependencies).execute(
        testUserData
      );
      // check the received data
      expect(addedUser).toBeDefined();
      expect(addedUser.id).toBeDefined();
      expect(addedUser.name).toBe(testUserData.name);
      expect(addedUser.lastName).toBe(testUserData.lastName);
      expect(addedUser.gender).toBe(testUserData.gender);
      expect(addedUser.meta).toEqual(testUserData.meta);
      // check if the dependencies are called as expected
      const call = mockUserRepo.add.mock.calls[0][0]; // TODO: lookup in the docs
      expect(call.id).toBeUndefined();
      expect(call.name).toBe(testUserData.name);
      expect(call.lastName).toBe(testUserData.lastName);
      expect(call.gender).toBe(testUserData.gender);
      expect(call.meta).toEqual(testUserData.meta);
    });
  });
});
