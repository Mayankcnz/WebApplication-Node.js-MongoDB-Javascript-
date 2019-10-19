
var Product = require('../models/product');
const db = require('../src/db');

console.log("jhere");

db.connectToServer().then(() => {
  console.log('Connected to database ');

  const products = [
    new Product({
      name: 'Running shoes',
      category: 'sports',
      subCategory: 'running',
      gender: 'm',
      image: 'https://dks.scene7.com/is/image/dkscdn/18BROMRVL2BLKGRYXMNS_Oreo_is?wid=1080&fmt=jpg',
      stock: [{size: 7, count: 2}, {size: 8, count: 5}, {size: 9, count: 3}],
      description:'running shoes',
    }),
    new Product({
      name: 'Hiking Boots',
      category: 'boots',
      gender: 'm',
      image: 'https://i.stpost.com/asolo-neutron-gore-tex-hiking-boots-waterproof-for-men-in-grey-avio~p~5486y_02~1500.5.jpg',
      stock: [{size: 8, count: 3}, {size: 9, count: 5}, {size: 10, count: 3}],
      description:'Hiking boots for outdoors',
    }),
    new Product({
      name: 'Dress Shoes',
      category: 'fancy',
      gender: 'm',
      image: 'https://images.josbank.com/is/image/JosBank/40KL_01_JOSEPH_ABBOUD_HERITAGE_BLACK_MAIN?$browse_thumbnail$?$browse_thumbnail$',
      stock: [{size: 7, count: 2}, {size: 8, count: 1}, {size: 9, count: 7}],
      description:'Fancy shoes for that special meeting',
    }),
    new Product({
      name: '2 Inch Heels',
      category: 'fancy',
      gender: 'f',
      image: 'https://cdn.shopify.com/s/files/1/1117/1266/files/collection-page-2inch-heels-270x269.jpg?14898049490607918996',
      stock: [{size: 5, count: 2}, {size: 6, count: 3}, {size: 7, count: 6}],
      description:'Some heels',
    }),
  ];

  let count = 0;

  products.forEach((product) => {
    product.save().then((output) => {
      console.log("adding");
      count++;
      if(count === products.length){
        db.getDb().disconnect();
      }
    }).catch((error) => {
      console.error(error);
    });
  });
  
}).catch((error) =>{
  console.log('could not connect to the database');
  console.log(error);
});

/** 
db.connectToServer((error) =>{
  if(error){
    console.log('could not connect to the database');
    return;
  }

  console.log('Connected to database ');
  const products = [
    new Product({
      name: 'Running shoes',
      category: 'sports',
      subCategory: 'running',
      gender: 'm',
      image: 'https://dks.scene7.com/is/image/dkscdn/18BROMRVL2BLKGRYXMNS_Oreo_is?wid=1080&fmt=jpg',
      stock: [{size: 7, count: 2}, {size: 8, count: 5}, {size: 9, count: 3}],
      description:'running shoes',
    }),
    new Product({
      name: 'Hiking Boots',
      category: 'boots',
      gender: 'm',
      image: 'https://i.stpost.com/asolo-neutron-gore-tex-hiking-boots-waterproof-for-men-in-grey-avio~p~5486y_02~1500.5.jpg',
      stock: [{size: 8, count: 3}, {size: 9, count: 5}, {size: 10, count: 3}],
      description:'Hiking boots for outdoors',
    }),
    new Product({
      name: 'Dress Shoes',
      category: 'fancy',
      gender: 'm',
      image: 'https://images.josbank.com/is/image/JosBank/40KL_01_JOSEPH_ABBOUD_HERITAGE_BLACK_MAIN?$browse_thumbnail$?$browse_thumbnail$',
      stock: [{size: 7, count: 2}, {size: 8, count: 1}, {size: 9, count: 7}],
      description:'Fancy shoes for that special meeting',
    }),
    new Product({
      name: '2 Inch Heels',
      category: 'fancy',
      gender: 'f',
      image: 'https://cdn.shopify.com/s/files/1/1117/1266/files/collection-page-2inch-heels-270x269.jpg?14898049490607918996',
      stock: [{size: 5, count: 2}, {size: 6, count: 3}, {size: 7, count: 6}],
      description:'Some heels',
    }),
  ];

  products.forEach((product) => {
    product.save().then((output) => {
    }).catch((error) => {
      console.error(error);
    });
  });

  db.getDb().disconnect();
});

*/
