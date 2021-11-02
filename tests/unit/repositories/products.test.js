const Chance = require('chance');
const { cloneDeep } = require('lodash');

const { productsRepository } = require('../../../src/repositories/inMemory');

const { Product } = require('../../../src/entities');

const chance = new Chance();

describe('Products repository', () => {
  test('New product should be added and returned', async () => {
    const testProduct = new Product({
      name: chance.name(),
      description: chance.paragraph(),
      images: [],
      price: chance.integer({ min: 1, max: 100 }),
      color: chance.color(),
      meta: {
        isPopular: chance.bool(),
      },
    });
    const addedProduct = await productsRepository.add(testProduct);
    expect(addedProduct).toBeDefined();
    expect(addedProduct.id).toBeDefined();
    expect(addedProduct.name).toBe(testProduct.name);
    expect(addedProduct.description).toBe(testProduct.description);
    expect(addedProduct.images).toBe(testProduct.images);
    expect(addedProduct.price).toBe(testProduct.price);
    expect(addedProduct.color).toBe(testProduct.color);
    expect(addedProduct.meta).toBe(testProduct.meta);

    const returnedProduct = await productsRepository.getById(addedProduct.id);
    expect(returnedProduct).toEqual(addedProduct);
  });
  test('New product should be deleted', async () => {
    // init two products
    const firstProduct = new Product({
      name: chance.name(),
      description: chance.paragraph(),
      images: [],
      price: chance.integer({ min: 1, max: 100 }),
      color: chance.color(),
      meta: {
        isPopular: chance.bool(),
      },
    });

    const secondProduct = new Product({
      name: chance.name(),
      description: chance.paragraph(),
      images: [],
      price: chance.integer({ min: 1, max: 100 }),
      color: chance.color(),
      meta: {
        isPopular: chance.bool(),
      },
    });
    // add the two products
    const [firstAddedProduct, secondAddedProduct] = await Promise.all([
      productsRepository.add(firstProduct),
      productsRepository.add(secondProduct),
    ]);
    expect(firstAddedProduct).toBeDefined();
    expect(secondAddedProduct).toBeDefined();
    // delete the first product
    const deletedProduct = await productsRepository.delete(firstAddedProduct);
    expect(deletedProduct).toEqual(firstAddedProduct);
    // try to get the deleted product (should be undefined)
    const shouldBeUndefinedProduct = await productsRepository.getById(
      deletedProduct.id
    );
    expect(shouldBeUndefinedProduct).toBeUndefined();
    // check that the second product is defined (not deleted)
    const shouldBeDefinedProduct = await productsRepository.getById(
      secondAddedProduct.id
    );
    expect(shouldBeDefinedProduct).toBeDefined();
  });
  test('New product should be updated', async () => {
    // add a product
    const testProduct = new Product({
      name: chance.name(),
      description: chance.paragraph(),
      images: [],
      price: chance.integer({ min: 1, max: 100 }),
      color: chance.color(),
      meta: {
        isPopular: chance.bool(),
      },
    });
    const addedProduct = await productsRepository.add(testProduct);
    expect(addedProduct).toBeDefined();
    // update the product
    const clonedProduct = cloneDeep({
      ...addedProduct,
      name: chance.name,
      price: chance.integer({ min: 1, max: 100 }),
    });
    const updatedProduct = await productsRepository.update(clonedProduct);
    expect(updatedProduct).toEqual(clonedProduct);
  });
});
