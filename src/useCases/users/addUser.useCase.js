const { User } = require('../../entities');

module.exports = (dependencies) => {
  const { usersRepository } = dependencies;
  if (!usersRepository) {
    throw new Error('usersRepository is required');
  }

  const execute = ({ name, lastName, gender, meta }) => {
    const user = new User({
      name,
      lastName,
      gender,
      meta,
    });

    return usersRepository.add(user);
  };

  return { execute };
};
