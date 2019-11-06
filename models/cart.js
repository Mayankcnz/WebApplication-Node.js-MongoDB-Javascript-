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

  add(item) {
    
    let exits = false;
    let i = 0;
    for (i; i < this.items.length; i++){
      if(JSON.stringify(this.items[i].item._id) === JSON.stringify(item._id)){
        exits = true;
        break;
      }
    }
    if(exits) { // item exists in cart
      this.items[i].qty = this.items[i].qty + 1;
    } else { // new item to be added
      console.log(typeof(this.items));
      if (typeof(this.items) != "object") this.items = [];
      this.items.push({item, qty: 1})
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
