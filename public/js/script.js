const addToCart = (id) =>{
  // get the priduct id on click and do an ajax call to the server to add the prouct to the cart database
  fetch(`/cart/add/${id}`, {method: 'POST'}).then((output) => {
    return output.json();
  }).then((output) => {
    if(output.error) {
      // error message
      console.error(output.error);
    } else {
      console.log(output); // show a completion dialog
    }
  }).catch((error) => {
    console.error(error); // show an error dialog
  })
}

// this is the code that logs the user out after 10 min of inactivity
setTimeout(() => {
  window.location = `/auth/timeout?location=${window.location}`; // log out the user
}, 1000 * 60 * 10);