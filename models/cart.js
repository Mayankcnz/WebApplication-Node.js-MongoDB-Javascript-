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
    if(this.items[item]) { // item exists in cart
      this.items[item].qty = this.items[item].qty + 1;
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
        delete this.items[item];
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
