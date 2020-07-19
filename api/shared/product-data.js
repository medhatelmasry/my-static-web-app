const CosmosClient = require("@azure/cosmos").CosmosClient;
const DbContext = require("../data/data-context");
const SeedData = require("../data/seed-data");

const { ENDPOINT, KEY, DATABASE, CONTAINER, PARTITION_KEY } = process.env;
const client = new CosmosClient({ endpoint: ENDPOINT, key: KEY });
const database = client.database(DATABASE);
const container = database.container(CONTAINER);

const seedProducts = async () => {
  let partition_key = JSON.parse(PARTITION_KEY);
  await DbContext.create(client, DATABASE, CONTAINER, partition_key);

  let iterator = container.items.readAll();
  let { resources } = await iterator.fetchAll();

  if (resources.length > 0) {
    return { "message": `The database is already seeded with ${resources.length} products.` };
  } else {

    const products = SeedData.getSeedProductData();

    products.forEach(async function (item) {
      const { resource: createdItem } = await container.items.create(item);
      console.log(item);
    })

    return { "message": `The database has been seeded with ${products.length} products.` };
  }
};

const getProducts = async () => {
  let iterator = container.items.readAll();
  let { resources } = await iterator.fetchAll();
  return resources;
};

const addProduct = async (productToAdd) => {
  // remove 'id' property from the JSON object
  delete productToAdd.id;

  let { product } = await container.items.create(productToAdd);
  return product;
};

const updateProduct = async (id, product) => {
  // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
  // console.log("PRODUCT >>>>>>>>>>>>>", product);
  // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
  // console.log("PRODUCT Name >>>>>>>>>>>>>", product.name);
  // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
  // console.log("ID >>>>>>>>>>>>>", id);
  // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
  return await container.item(id, product.name).replace(product);
};

const readProduct = async (id) => {
  // query to return all items
  const querySpec = {
    query: "SELECT * FROM c WHERE c.id='" + id + "'"
  };

  // read all items in the Items container
  const { resources: items } = await container.items
    .query(querySpec)
    .fetchAll();

  if (items.length > 0)
    return items[0];
  else
    return {};
};

const deleteProduct = async (id, name) => {
  return await container.item(id, name).delete();
};

module.exports = {
  seedProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  readProduct
};
