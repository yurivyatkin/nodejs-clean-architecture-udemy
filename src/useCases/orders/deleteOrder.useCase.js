module.exports = (dependencies) => {
  const { ordersRepository } = dependencies;

  if (!ordersRepository) {
    throw new Error('ordersRepository is required');
  }

  const execute = ({ order = {} }) => {
    return ordersRepository.delete(order);
  };

  return { execute };
};
