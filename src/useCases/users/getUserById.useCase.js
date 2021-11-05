module.exports = (dependencies) => {
  const { usersRepository } = dependencies;

  if (!usersRepository) {
    throw new Error('usersRepository is required');
  }

  const execute = ({ id }) => {
    return usersRepository.getById(id);
  };

  return { execute };
};
