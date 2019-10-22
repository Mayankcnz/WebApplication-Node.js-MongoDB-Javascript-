const mongoose = require('../src/db').getDb();
const Schema = mongoose.Schema;
const productsSchema = require('./product').schema;

// create product schema and model
const userSchema = new Schema({
  name:{type:String, required:[true, 'Name field is required']},
  email: {type: String, required: [true, 'email is required']},
  password: {type: String, required: () => this.authType === 'local'}, // password is only required when authType is local
  authType: {type: String, required: [true, 'required auth type'], default: 'local'},
<<<<<<< HEAD
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
=======
>>>>>>> 57253315ff6cb8f7fb860e1f3336110d44c71d1a
});

const user = mongoose.model('user', userSchema); // create a user model, which would represent a collection in the database

module.exports = user;