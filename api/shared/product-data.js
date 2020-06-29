const CosmosClient = require("@azure/cosmos").CosmosClient;
const DbContext = require("../data/data-context");
const SeedData = require("../data/seed-data");

const data = {
  products: [
    {
      name: 'Strawberries',
      description: '16oz package of fresh organic strawberries',
      quantity: '1',
    },
    {
      name: 'Sliced bread',
      description: 'Loaf of fresh sliced wheat bread',
      quantity: 1,
    },
    {
      name: 'Apples',
      description: 'Bag of 7 fresh McIntosh apples',
      quantity: 1,
    },
  ],
};

const { ENDPOINT, KEY, DATABASE, CONTAINER, PARTITION_KEY} = process.env;
const client = new CosmosClient({ endpoint: ENDPOINT, key: KEY });
const database = client.database(DATABASE);
const container = database.container(CONTAINER);

const seedProducts = async () => {
  let partition_key =JSON.parse(PARTITION_KEY);
  await DbContext.create(client, DATABASE, CONTAINER, partition_key);

  let iterator = container.items.readAll();
    let { resources } = await iterator.fetchAll();

    if (resources.length > 0) {
      return {"message": `The database is already seeded with ${resources.length} products.`};
    } else {
      
      const products = SeedData.getSeedProductData();

      products.forEach(async function (item) {
        const { resource: createdItem } = await container.items.create(item);
        console.log(item);
      })

      return {"message": `The database has been seeded with ${products.length} products.`};
    }
};

const getProducts = async () => {
  let iterator = container.items.readAll();
  let { resources } = await iterator.fetchAll();
  return resources;
};

const addProduct = async (productToAdd) => {
  let { product } = await container.items.create(productToAdd);
  return product;
};

const updateProduct = async (product) => {
  const { id, name } = product;
  return await container.item(id, name).replace(product);
};

const deleteProduct = async (id,name) => {
  return await container.item(id,name).delete();
};


module.exports = {seedProducts, addProduct, updateProduct, deleteProduct, getProducts };
