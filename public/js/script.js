const addToCart = (id) =>{
  // get the priduct id on click and do an ajax call to the server to add the prouct to the cart database
  fetch(`/cart/add/${id}`, {method: 'POST'}).then((output) => {
    return output.json();
  }).then((output) => {
    if(output.error) {
      alert('Failed to add item to cart')
      console.error(output.error);
    } else {
      console.log(output); // show a completion dialog
    }
  }).catch((error) => {
    alert('Failed to add item to cart, are you logged in?')
    console.error(error); // show an error dialog
  })
}

const deleteFromCart = (id) =>{
  fetch(`/cart/delete/${id}`, {method:'DELETE'}).then((output) =>{
    return output.json();
  }).then((output) =>{
    if(output.error){
      alert('Failed to delete item')
      location.reload()
      console.error(output.error);
    }else {
      alert('Item deleted')
      location.reload()
      console.log(output);
    }
  }).catch((error) =>{
    alert('Failed to delete item, are you logged in?')
    location.reload()
    console.error(error);
  })
}

// this is the code that logs the user out after 10 min of inactivity
setTimeout(() => {
  window.location = `/auth/timeout?location=${window.location}`; // log out the user
}, 1000 * 60 * 10);