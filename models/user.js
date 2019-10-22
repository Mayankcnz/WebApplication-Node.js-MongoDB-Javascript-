const mongoose = require('../src/db').getDb();
const Schema = mongoose.Schema;
const productsSchema = require('./product').schema;

const userCartSchema = new Schema({
  items:[productsSchema],
  status: String
})
// create product schema and model
const userSchema = new Schema({
  name:{type:String, required:[true, 'Name field is required']},
  email: {type: String, required: [true, 'email is required']},
  password: {type: String}, // password is only required when authType is local
  authType: {type: String, required: [true, 'required auth type'], default: 'local'},
  address: {type: String, required: [true, 'address is required']},

  cart:{
    type:userCartSchema,
    default:{
      items:[],
      status: "Active"
    }
  },
   orderHistory: [{
     type: Schema.Types.ObjectId,
     ref: "Cart"
   }]
});

const user = mongoose.model('user', userSchema); // create a user model, which would represent a collection in the database

module.exports = user;