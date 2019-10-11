const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create product schema and model
const productSchema = new Schema({

    name:{
        type:String,
        required:[true, 'Name field is required']
    },
    category: String,
    subcategory:[{
        type:String,
        model:[{
            type:String,
            colour:[{
                name:String,
                image:String
            }],
            size:[{
                val:Number,
                price:Number
            }]
        }]
    }],
    description:{
        type:String,
        required:[true, 'Description field is required']
    },
    avilable:{
        type: Boolean,
        default: true
    },
    description:String,
    created_at:{ type: Date },
    updated_at:{ type: Date, default: Date.now },
    updated:{type: Date, default: Date.now}
});

const product = mongoose.model('product',productSchema); // create a product model , which would represent a collection in the database