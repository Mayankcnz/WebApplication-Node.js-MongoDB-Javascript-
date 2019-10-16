
var Product = require('../models/product');
const mongoose = require("mongoose");
const dotenv = require('dotenv').config('../.env')
const url = process.env.DATABASE_URL;

const db = require('./src/db')

db.connectToServer((error) =>{
    if(error){
      console.log('could not connect to the database');
      return;
    }else {
      console.log('Connected to database ');
      var products = [
        new Product({
            type:"idk",
            category: "male",
            subcategory:[{
                type:"null",
                color:[{
                    name: "red",
                    image:"https://dks.scene7.com/is/image/dkscdn/19NIKMDWNSHFTR9RDRNN_Black_White_is?wid=1080&fmt=jpg"
                }],
                size:[{
                    val:10,
                    price:100.0
                }]
            }],
            description:{
                type: "Running shoes perfect for everyday use"
            },
            available:{
                type: true
            },
            description:"running shoes",
            created_at:{type: new Date()},
            updated_at:{type: new Date()}
        })
    ];
    
    var done = 0;
    console.log(products.length)
    for (var i = 0; i < products.length; i++){
        products[i].save(function(err, result){
            done++;
            if (done === products.length){
                exit();
            }
        }); // save the model to the database
    }
    }
  })

  



// create a new product

function exit(){
    mongoose.disconnect();
    console.log("disconnected");
}