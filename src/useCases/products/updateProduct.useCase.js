module.exports = (dependencies) => {
  const { productsRepository } = dependencies;

  if (!productsRepository) {
    throw new Error('productsRepository is required');
  }

  const execute = ({ product = {} }) => {
    return productsRepository.update(product);
  };

  return { execute };
};
