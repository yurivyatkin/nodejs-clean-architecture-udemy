module.exports = (dependencies) => {
  const { productsRepository } = dependencies;

  if (!productsRepository) {
    throw new Error('productsRepository is required');
  }

  const execute = ({ id }) => {
    return productsRepository.getById(id);
  };

  return { execute };
};

