module.exports = (dependencies) => {
  const { ordersRepository } = dependencies;

  if (!ordersRepository) {
    throw new Error('ordersRepository is required');
  }

  const execute = ({ id }) => {
    return ordersRepository.getById(id);
  };

  return { execute };
};
