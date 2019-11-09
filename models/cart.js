/**
 * cart classthat lets you create cart objects
 * Whenever we access the cart, take the old cartand create a new cart off this old cart
 * Also, be able to check if the product already exists and in the case where
 * it does exists, then we simply update the quanity. 
 */
class Cart {
  constructor(previousCart) {
    this.items = previousCart.items;
    this.totalCost = previousCart.totalCost || 0;
  }


  // if id is same as already present items, then increase the quantitity others add item
  add(item, shoeSize) {

    let new_item = new Object();
    
    let exits = false;
    let i = 0;
    for (i; i < this.items.length; i++){
      if(JSON.stringify(this.items[i].new_item._id) === JSON.stringify(item._id) 
                  && parseInt(this.items[i].new_item.size) === parseInt(shoeSize)){
        exits = true;
        break;
      }
    }

    if(exits) { // item exists in cart
      this.items[i].qty = this.items[i].qty + 1;
      console.log(this.items[i])
    } else { // new item to be added
      new_item._id = item._id;
      new_item.available = item.avilable;
      new_item.size = parseInt(shoeSize);
      new_item.description = item.description;
      new_item.cost = item.cost;
      new_item.category = item.category;
      new_item.name = item.name;
      new_item.image = item.image;

      if (typeof(this.items) != "object") this.items = []; // by default the items array is '0' for some reason???
      this.items.push({new_item, qty: 1})
    }

    this.totalCost += item.cost;
  };

  remove(item) {
    var storedItem = this.items[item];
    if(storedItem) { // item exists in cart
      this.items[item].qty = this.items[item].qty - 1;
      if(this.items[item].qty === 0) { // none left so delete
         this.items.splice(item, 1);
      }
      this.totalCost -= item.cost;
    }

    return this.items;
  }

  getItems() {
    return this.items;
  }

  gettotalCost() {
    return this.totalCost;
  }

  getObject() {
    return {totalCost: this.totalCost, items: this.items}
  }
}

module.exports = Cart;
