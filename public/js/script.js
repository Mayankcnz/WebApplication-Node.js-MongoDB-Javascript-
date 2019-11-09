const addToCart = (id) =>{
  let size = document.getElementById("span_text").innerText;
  if( isNaN(size)){
    alert("Shoe size must be specified");
    return;
  }
  fetch(`/cart/add/${id}`, {method: 'POST', body: {size}}).then((output) => {
    return output.json();
  }).then((output) => {
    if(output.error) {
      alert('Failed to add item to cart')
    } else {
      alert('Added to cart')
    }
  }).catch((error) => {
    alert('Failed to add item to cart, are you logged in?')
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