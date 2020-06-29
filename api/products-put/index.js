const data = require('../shared/product-data');

module.exports = async function (context, req) {
  
  const product = req.body;

  try {
    const { updatedProduct } = await data.updateProduct(product);
    context.res.status(200).json(updatedProduct);
  } catch (error) {
    context.res.status(500).send(error);
  }
};
