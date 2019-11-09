// will add the javascrit object to this order model when checking out

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    user: {type: Object, ref: 'User'},
    cart: {type: Object, required: true},
    address: {type: Object, required: true},
    paymentInfo: {type: Object, required: true},
    email: {type: String, required: true},
    name: {type: String, required: true},
    //paymentId: {type: String, required: true},
    created_at: { type: Date, default: Date.now},
});

module.exports = mongoose.model('Order', schema);