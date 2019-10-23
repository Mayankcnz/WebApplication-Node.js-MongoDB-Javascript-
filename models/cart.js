module.exports = function Cart(previousCart){

  this.items = previousCart.items || {};
  this.totalQty = previousCart.totalQty || 0;
  this.totalPrice = previousCart.totalPrice || 0;


  this.add = function(item, id){
    var storedItem = this.items[id];
    if(!storedItem){
      storedItem = this.items[id] = {item: item, qty: 0, price: 0};
    }

    storedItem.qty++;
    storedItem.price = storedItem.price * storedItem.qty;
    this.totalQty++;
    this.totalPrice = storedItem.items.price;
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