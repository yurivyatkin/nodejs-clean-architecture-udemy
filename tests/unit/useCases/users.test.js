const Chance = require('chance');

const { v4: uuidv4 } = require('uuid');

const {
  user: { addUserUseCase, getUserByIdUseCase, updateUserUseCase },
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
    getById: jest.fn(async (id) => ({
      id,
      name: chance.name(),
      lastName: chance.last(),
      gender: genders.NOT_SPECIFIED,
      meta: {},
    })),
    update: jest.fn(async (user) => user),
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

  describe('Get user by id use case', () => {
    test('user should be returned by id', async () => {
      // generate a fake id
      const testId = uuidv4();
      // call get user by id use case
      const userById = await getUserByIdUseCase(dependencies).execute({
        id: testId,
      });
      // check the data
      expect(userById).toBeDefined();
      expect(userById.id).toBe(testId);
      expect(userById.name).toBeDefined();
      expect(userById.lastName).toBeDefined();
      expect(userById.gender).toBeDefined();
      expect(userById.meta).toBeDefined();
      // check the mock
      const expectedId = mockUserRepo.getById.mock.calls[0][0];
      expect(expectedId).toBe(testId);
    });
  });

  describe('Update user use case', () => {
    test('user should be updated', async () => {
      // create user data
      const testUserData = new User({
        id: uuidv4(),
        name: chance.name(),
        lastName: chance.last(),
        gender: genders.FEMALE,
        meta: {
          education: {
            school: 'full',
          },
        },
      });
      // call update user
      const updatedUser = await updateUserUseCase(dependencies).execute({
        user: testUserData,
      });
      // check the result
      expect(updatedUser).toEqual(testUserData);
      // check the call
      const expectedUser = mockUserRepo.update.mock.calls[0][0];
      expect(expectedUser).toBe(testUserData);
    });
  });
});
