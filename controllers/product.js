const Product = require('../models/product');

const findOne = (_id) => new Promise((resolve, reject) => {
  Product.findById(_id).exec().then((output) => {
    resolve(output[0]);
  }).catch((error) => {
    reject(error);
  });
});

const findAll = () => Product.find({}).exec();

module.exports = {
  findOne,
  findAll,
};
