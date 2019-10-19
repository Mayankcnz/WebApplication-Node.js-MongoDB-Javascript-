const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.DATABASE_URL || 'mongodb://localhost:27017/shoeshop';

let db;
module.exports = {
  connectToServer: () => mongoose.connect(url, {useNewUrlParser: true,  useUnifiedTopology: true }),

  /**
   * @return {mongoose} the database
   */
  getDb: () => mongoose,
};
