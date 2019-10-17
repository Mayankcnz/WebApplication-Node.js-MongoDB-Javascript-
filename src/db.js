const mongoose = require('mongoose');

const url = process.env.DATABASE_URL || 'mongodb://localhost:27017/shoeshop';

let db;
module.exports = {
  connectToServer: () => mongoose.connect(url, {useNewUrlParser: true}),

  /**
   * @return {mongoose} the database
   */
  getDb: () => mongoose,
};
