
const addToCart = (id) =>{

  console.log(id)
    // get the priduct id on click and do an ajax call to the server to add the prouct to the cart database
    fetch(`/cart/add/${id}`, {method: 'POST'}).then((output) => {
        console.log(output.json);
        console.log("here");
        return output.json();
    }).then((output) => {
        console.log(output);
    }).catch((error) => {
        console.error(error);
    })
}



// this is the code that logs the user out after 10 min of inactivity
setTimeout(() => {
  window.location = `/auth/timeout?location=${window.location}`; // log out the user
}, 1000 * 60 * 10);