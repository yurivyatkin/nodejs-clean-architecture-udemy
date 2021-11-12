const Chance = require('chance');

const { v4: uuidv4 } = require('uuid');

const {
  order: { addOrderUseCase },
} = require('../../../src/useCases');

const { Order } = require('../../../src/entities');

const chance = new Chance();

describe('Orders Use Cases', () => {
  const mockOrderRepo = {
    add: jest.fn(async (order) => ({
      ...order,
      id: uuidv4(),
    })),
  };

  const dependencies = {
    ordersRepository: mockOrderRepo,
  };

  describe('Add Order Use Case', () => {
    it('should add an order using the given repository', async () => {
      // create order data
      const testOrderData = new Order({
        userId: chance.guid(),
        productIds: [chance.guid()],
        date: new Date(),
        isPayed: false,
        meta: {
          test: 'test',
        },
      });
      // add a order using the use case
      const addedOrder = await addOrderUseCase(dependencies).execute(
        testOrderData
      );
      // check the received data
      expect(addedOrder).toBeDefined();
      expect(addedOrder.id).toBeDefined();
      expect(addedOrder.userId).toBe(testOrderData.userId);
      expect(addedOrder.productIds).toEqual(testOrderData.productIds);
      expect(addedOrder.date).toEqual(testOrderData.date);
      expect(addedOrder.isPayed).toBe(testOrderData.isPayed);
      expect(addedOrder.meta).toEqual(testOrderData.meta);
      // check if the dependencies are called as expected
      const call = mockOrderRepo.add.mock.calls[0][0];
      expect(call.id).toBeUndefined();
      expect(call.userId).toBe(testOrderData.userId);
      expect(call.productIds).toEqual(testOrderData.productIds);
      expect(call.date).toEqual(testOrderData.date);
      expect(call.isPayed).toBe(testOrderData.isPayed);
      expect(call.meta).toEqual(testOrderData.meta);
    });
  });
});
