const { Order } = require('../../entities');

module.exports = (dependencies) => {
  const { ordersRepository } = dependencies;
  if (!ordersRepository) {
    throw new Error('ordersRepository is required');
  }

  const execute = ({ userId, productIds, date, isPayed, meta }) => {
    const order = new Order({
      userId,
      productIds,
      date,
      isPayed,
      meta,
    });

    return ordersRepository.add(order);
  };

  return { execute };
};
