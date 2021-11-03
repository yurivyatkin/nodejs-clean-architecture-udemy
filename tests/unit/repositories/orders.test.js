const Chance = require('chance');
const { cloneDeep } = require('lodash');

const { ordersRepository } = require('../../../src/repositories/inMemory');

const { Order } = require('../../../src/entities');

const chance = new Chance();

describe('Orders repository', () => {
  test('New order should be added and returned', async () => {
    const testOrder = new Order({
      userId: chance.guid(),
      productIds: [chance.guid(), chance.guid()],
      date: chance.date(),
      isPayed: chance.bool(),
      meta: {
        deliveryComments: chance.sentence(),
      },
    });
    const addedOrder = await ordersRepository.add(testOrder);
    expect(addedOrder).toBeDefined();
    expect(addedOrder.id).toBeDefined();
    expect(addedOrder.userId).toBe(testOrder.userId);
    expect(addedOrder.productIds).toBe(testOrder.productIds);
    expect(addedOrder.date).toBe(testOrder.date);
    expect(addedOrder.isPayed).toBe(testOrder.isPayed);
    expect(addedOrder.meta).toBe(testOrder.meta);

    const returnedOrder = await ordersRepository.getById(addedOrder.id);
    expect(returnedOrder).toEqual(addedOrder);
  });
  test('New order should be deleted', async () => {
    // init two orders
    const firstOrder = new Order({
      userId: chance.guid(),
      productIds: [chance.guid(), chance.guid()],
      date: chance.date(),
      isPayed: chance.bool(),
      meta: {
        deliveryComments: chance.sentence(),
      },
    });

    const secondOrder = new Order({
      userId: chance.guid(),
      productIds: [chance.guid(), chance.guid()],
      date: chance.date(),
      isPayed: chance.bool(),
      meta: {
        deliveryComments: chance.sentence(),
      },
    });
    // add the two orders
    const [firstAddedOrder, secondAddedOrder] = await Promise.all([
      ordersRepository.add(firstOrder),
      ordersRepository.add(secondOrder),
    ]);
    expect(firstAddedOrder).toBeDefined();
    expect(secondAddedOrder).toBeDefined();
    // delete the first order
    const deletedOrder = await ordersRepository.delete(firstAddedOrder);
    expect(deletedOrder).toEqual(firstAddedOrder);
    // try to get the deleted order (should be undefined)
    const shouldBeUndefinedOrder = await ordersRepository.getById(
      deletedOrder.id
    );
    expect(shouldBeUndefinedOrder).toBeUndefined();
    // check that the second order is defined (not deleted)
    const shouldBeDefinedOrder = await ordersRepository.getById(
      secondAddedOrder.id
    );
    expect(shouldBeDefinedOrder).toBeDefined();
  });
  test('New order should be updated', async () => {
    // add a order
    const testOrder = new Order({
      userId: chance.guid(),
      productIds: [chance.guid(), chance.guid()],
      date: chance.date(),
      isPayed: chance.bool(),
      meta: {
        deliveryComments: chance.sentence(),
      },
    });
    const addedOrder = await ordersRepository.add(testOrder);
    expect(addedOrder).toBeDefined();
    // update the order
    const clonedOrder = cloneDeep({
      ...addedOrder,
      name: chance.name,
      price: chance.integer({ min: 1, max: 100 }),
    });
    const updatedOrder = await ordersRepository.update(clonedOrder);
    expect(updatedOrder).toEqual(clonedOrder);
  });
});
