const data = require('../shared/product-data');

module.exports = async function (context, req) {
  const product = req.body;

  try {
    const newProduct = await data.addProduct(product);
    context.res.status(201).json(newProduct);
  } catch (error) {
    context.res.status(500).send(error);
  }
};
