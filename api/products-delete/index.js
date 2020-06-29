const data = require('../shared/product-data');

module.exports = async function (context, req) {
  const name = req.body.name;
  const id = req.params.id;

  try {
    const { result } = await data.deleteProduct(id,name);
    console.log("result >> ", result);
    context.res.status(200).json(result);
  } catch (error) {
    context.res.status(500).send(error);
  }
};
