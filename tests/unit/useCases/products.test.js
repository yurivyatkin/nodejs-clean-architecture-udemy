const Chance = require('chance');

const { v4: uuidv4 } = require('uuid');

const {
  product: { addProductUseCase, getProductByIdUseCase, updateProductUseCase },
} = require('../../../src/useCases');

const { Product } = require('../../../src/entities');

const chance = new Chance();

describe('Products Use Cases', () => {
  const mockProductRepo = {
    add: jest.fn(async (product) => ({
      ...product,
      id: uuidv4(),
    })),
    getById: jest.fn(async (id) => ({
      id,
      name: chance.name(),
      description: chance.sentence(),
      images: [],
      price: chance.integer({ min: 1, max: 100 }),
      color: chance.color(),
      meta: {
        stock: chance.integer({ min: 1, max: 100 }),
      },
    })),
    update: jest.fn(async (user) => user),
  };

  const dependencies = {
    productsRepository: mockProductRepo,
  };

  describe('Add Product Use Case', () => {
    it('should add a product using the given repository', async () => {
      // create product data
      const testProductData = new Product({
        name: chance.name(),
        description: chance.paragraph(),
        images: [],
        price: chance.integer({ min: 1, max: 100 }),
        color: 'red',
        meta: {
          stock: chance.integer({ min: 1, max: 100 }),
        },
      });
      // add a product using the use case
      const addedProduct = await addProductUseCase(dependencies).execute(
        testProductData
      );
      // check the received data
      expect(addedProduct).toBeDefined();
      expect(addedProduct.id).toBeDefined();
      expect(addedProduct.name).toBe(testProductData.name);
      expect(addedProduct.description).toBe(testProductData.description);
      expect(addedProduct.images).toBe(testProductData.images);
      expect(addedProduct.price).toBe(testProductData.price);
      expect(addedProduct.color).toBe(testProductData.color);
      expect(addedProduct.meta).toEqual(testProductData.meta);
      // check if the dependencies are called as expected
      const call = mockProductRepo.add.mock.calls[0][0];
      expect(call.id).toBeUndefined();
      expect(call.name).toBe(testProductData.name);
      expect(call.description).toBe(testProductData.description);
      expect(call.images).toBe(testProductData.images);
      expect(call.price).toBe(testProductData.price);
      expect(call.color).toBe(testProductData.color);
      expect(call.meta).toEqual(testProductData.meta);
    });
  });

  describe('Get product by id use case', () => {
    test('product should be returned by id', async () => {
      // generate a fake id
      const testId = uuidv4();
      // call get product by id use case
      const productById = await getProductByIdUseCase(dependencies).execute({
        id: testId,
      });
      // check the data
      expect(productById).toBeDefined();
      expect(productById.id).toBe(testId);
      expect(productById.name).toBeDefined();
      expect(productById.description).toBeDefined();
      expect(productById.images).toBeDefined();
      expect(productById.price).toBeDefined();
      expect(productById.color).toBeDefined();
      expect(productById.meta).toBeDefined();
      // check the mock
      const expectedId = mockProductRepo.getById.mock.calls[0][0];
      expect(expectedId).toBe(testId);
    });
  });

  describe('Update product use case', () => {
    test('product should be updated', async () => {
      // create product data
      const testProductData = new Product({
        name: chance.name(),
        description: chance.paragraph(),
        images: [],
        price: chance.integer({ min: 1, max: 100 }),
        color: 'blue',
        meta: {
          stock: chance.integer({ min: 1, max: 100 }),
        },
      });
      // call update product
      const updatedProduct = await updateProductUseCase(dependencies).execute({
        product: testProductData,
      });
      // check the result
      expect(updatedProduct).toEqual(testProductData);
      // check the call
      const expectedProduct = mockProductRepo.update.mock.calls[0][0];
      expect(expectedProduct).toBe(testProductData);
    });
  });
});
