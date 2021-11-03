class Order {
  constructor({
    id,
    userId = null,
    productIds = [],
    date = new Date(),
    isPayed = false,
    meta = {},
  }) {
    this.id = id;
    this.userId = userId;
    this.productIds = productIds;
    this.date = date;
    this.isPayed = isPayed;
    this.meta = meta;
  }
}

module.exports = {
  Order,
};
