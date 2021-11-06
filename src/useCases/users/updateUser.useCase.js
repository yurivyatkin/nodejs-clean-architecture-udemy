module.exports = (dependencies) => {
  const { usersRepository } = dependencies;

  if (!usersRepository) {
    throw new Error('usersRepository is required');
  }

  const execute = ({ user = {} }) => {
    return usersRepository.update(user);
  };

  return { execute };
};

