/**
 * cart classthat lets you create cart objects
 * Whenever we access the cart, take the old cartand create a new cart off this old cart
 * Also, be able to check if the product already exists and in the case where
 * it does exists, then we simply update the quanity. 
 */
class Cart {
  constructor(previousCart) {
    this.items = previousCart.items;
    this.totalPrice = previousCart.totalPrice;
  }


  // if id is same as already present items, then increase the quantitity others add item
  add(item, shoeSize) {

    var new_item = new Object();
    
    let exits = false;
    let i = 0;
    for (i; i < this.items.length; i++){
      console.log(this.items[i].new_item.size+" ha2");
      if(JSON.stringify(this.items[i].new_item._id) === JSON.stringify(item._id) 
                  && parseInt(this.items[i].new_item.size) === parseInt(shoeSize)){
        exits = true;
        break;
      }
    }

    if(exits) { // item exists in cart
      this.items[i].qty = this.items[i].qty + 1;
    } else { // new item to be added
      new_item._id = item._id;
      new_item.available = item.avilable;
      new_item.size = parseInt(shoeSize);
      new_item.description = item.description;
      new_item.cost = item.cost;
      new_item.category = item.category;
      new_item.name = item.name;
      new_item.qty  = item.qty;
      new_item.image = item.image;
      console.log(typeof(this.items));
      if (typeof(this.items) != "object") this.items = [];
      this.items.push({new_item, qty: 1, totalCost: item.cost})
    }

    this.totalPrice += item.cost;
  };

  remove(item) {
    var storedItem = this.items[item];
    if(storedItem) { // item exists in cart
      this.items[item].qty = this.items[item].qty - 1;
      if(this.items[item].qty === 0) { // none left so delete
         this.items.splice(item, 1);
      }
      this.totalPrice -= item.cost;
    }

    return this.items;
  }

  getItems() {
    return this.items;
  }

  getTotalPrice() {
    return this.totalPrice;
  }

  getObject() {
    return {totalPrice: this.totalPrice, items: this.items}
  }
}

module.exports = Cart;
