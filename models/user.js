const mongoose = require('../src/db').getDb();
const Schema = mongoose.Schema;

// create product schema and model
const userSchema = new Schema({
  name:{type:String, required:[true, 'Name field is required']},
  email: {type: String, required: [true, 'email is required']},
  password: {type: String}, // password is only required when authType is local
  authType: {type: String, required: [true, 'required auth type'], default: 'local'},
  address: {type: String, required: [true, 'address is required']},
});

const user = mongoose.model('product', userSchema); // create a product model , which would represent a collection in the database

module.exports = user;