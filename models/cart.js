
/* cart constructor function that lets you create cart objects
  Whenever we access the cart, take the old cartand create a new cart off this old cart
  Also, be able to check if the product already exists and in the case where
  it does exists, then we simply update the quanity. 
*/
module.exports = function Cart(previousCart){

  console.log("IN THIS");
  console.log(previousCart);
  this.items = previousCart.items || {};
  this.totalQty = previousCart.totalQty || 0;
  this.totalPrice = previousCart.totalPrice || 0;
  console.log(previousCart);


  this.add = function(item, id){
    console.log("adding");
    var storedItem = this.items[id];
    if(!storedItem){
      console.log("should come here");
      storedItem = this.items[id] = {item: item, qty: 0, price: 0};
      
    }
    console.log("Yolo");
    storedItem.qty++;
    console.log("Yolo");
    storedItem.price = storedItem.price * storedItem.qty;
    console.log("Yolo");
    this.totalQty++;
    console.log("Yolo");
    this.totalPrice = storedItem.item.price;
    console.log("Yolo");
  };

  this.generateArray = function(){

    var array = [];
    for (var id in this.items){
      array.push(this.items[id]);
    }

    return array;
  }

  this.removeItem = function(id){
    this.totalQty -= this.items[id].qty;
    this.totalPrice -= this.items[id].price
    delete this.items[id];

  }

  this.reduceByOne = function(){
    this.items[id].qty --;
    this.items[id].price -= this.items[id].item.price;
    this.totalQty--;
    this.totalPrice -= this.items[id].item.price;

    if(this.items[id].qty <= 0){
      delete this.items[id];
    }
  }
}