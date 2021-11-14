const Chance = require('chance');

const { v4: uuidv4 } = require('uuid');

const {
  order: { addOrderUseCase, getOrderByIdUseCase, updateOrderUseCase },
} = require('../../../src/useCases');

const { Order } = require('../../../src/entities');

const chance = new Chance();

describe('Orders Use Cases', () => {
  const mockOrderRepo = {
    add: jest.fn(async (order) => ({
      ...order,
      id: uuidv4(),
    })),
    getById: jest.fn(async (id) => ({
      id,
      orderId: chance.guid(),
      orderIds: [chance.guid()],
      date: new Date(),
      isPayed: false,
      meta: {
        test: 'test',
      },
    })),
    update: jest.fn(async (product) => product),
  };

  const dependencies = {
    ordersRepository: mockOrderRepo,
  };

  describe('Add Order Use Case', () => {
    it('should add an order using the given repository', async () => {
      // create order data
      const testOrderData = new Order({
        orderId: chance.guid(),
        orderIds: [chance.guid()],
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
      expect(addedOrder.orderId).toBe(testOrderData.orderId);
      expect(addedOrder.orderIds).toEqual(testOrderData.orderIds);
      expect(addedOrder.date).toEqual(testOrderData.date);
      expect(addedOrder.isPayed).toBe(testOrderData.isPayed);
      expect(addedOrder.meta).toEqual(testOrderData.meta);
      // check if the dependencies are called as expected
      const call = mockOrderRepo.add.mock.calls[0][0];
      expect(call.id).toBeUndefined();
      expect(call.orderId).toBe(testOrderData.orderId);
      expect(call.orderIds).toEqual(testOrderData.orderIds);
      expect(call.date).toEqual(testOrderData.date);
      expect(call.isPayed).toBe(testOrderData.isPayed);
      expect(call.meta).toEqual(testOrderData.meta);
    });
  });

  describe('Get order by id use case', () => {
    test('order should be returned by id', async () => {
      // generate a fake id
      const testId = uuidv4();
      // call get order by id use case
      const orderById = await getOrderByIdUseCase(dependencies).execute({
        id: testId,
      });
      // check the data
      expect(orderById).toBeDefined();
      expect(orderById.id).toBe(testId);
      expect(orderById.orderId).toBeDefined();
      expect(orderById.orderIds).toBeDefined();
      expect(orderById.date).toBeDefined();
      expect(orderById.isPayed).toBeDefined();
      expect(orderById.meta).toBeDefined();
      // check the mock
      const expectedId = mockOrderRepo.getById.mock.calls[0][0];
      expect(expectedId).toBe(testId);
    });
  });

  describe('Update order use case', () => {
    test('order should be updated', async () => {
      // create order data
      const testOrderData = new Order({
        orderId: chance.guid(),
        orderIds: [chance.guid()],
        date: new Date(),
        isPayed: false,
        meta: {
          test: 'test',
        },
      });
      // call update order
      const updatedOrder = await updateOrderUseCase(dependencies).execute({
        order: testOrderData,
      });
      // check the result
      expect(updatedOrder).toEqual(testOrderData);
      // check the call
      const expectedOrder = mockOrderRepo.update.mock.calls[0][0];
      expect(expectedOrder).toBe(testOrderData);
    });
  });
});
