module.exports = (dependencies) => {
  const { usersRepository } = dependencies;

  if (!usersRepository) {
    throw new Error('usersRepository is required');
  }

  const execute = ({ user = {} }) => {
    return usersRepository.delete(user);
  };

  return { execute };
};
