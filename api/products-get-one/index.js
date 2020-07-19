const data = require('../shared/product-data');

module.exports = async function (context, req) {
  const id = req.params.id;
  try {
    const product = await data.readProduct(id);
    context.res.status(200).json(product);
  } catch (error) {
    context.res.status(500).send(error);
  }
};