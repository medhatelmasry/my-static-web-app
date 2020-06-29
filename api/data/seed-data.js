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
        quantity: 11,
      },
      {
        name: 'Apples',
        description: 'Bag of 7 fresh McIntosh apples',
        quantity: 12,
      },
      {
        name: 'Banana',
        description: 'Fresh Baby Nino Bananas',
        quantity: 13,
      },
      {
        name: 'Potatoes',
        description: 'Russet Potatoes',
        quantity: 14,
      },
      {
        name: 'Baking Powder',
        description: 'Baker\'s Supply HouseOrganic Baking Powder',
        quantity: 15,
      },
      {
        name: 'Sugar',
        description: 'Rogers Sugar Cubes',
        quantity: 16,
      },
      {
        name: 'Milk',
        description: 'Dairyland 1% Skim Milk',
        quantity: 17,
      },
      {
        name: 'Peppermint Tea',
        description: 'Tetley Pure Peppermint Tea',
        quantity: 18,
      },
      {
        name: 'Feta Cheese',
        description: 'Shepherd Gourmet Dairy Greek Sheep Feta Cheese',
        quantity: 19,
      },
    ],
  };
  
  const getSeedProductData = () => {
    return data.products;
  };
  
  module.exports = { getSeedProductData };
  