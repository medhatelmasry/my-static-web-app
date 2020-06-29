const data = require('../shared/product-data');

module.exports = async function (context, req) {
  try {
    const result = await data.seedProducts();
    context.res.status(200).json(result);
  } catch (error) {
    context.res.status(500).send(error);
  }
};
