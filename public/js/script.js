
const addToCart = (id) =>{
    // get the priduct id on click and do an ajax call to the server to add the prouct to the cart database
    console.log(id);
    fetch(`/cart/add/${id}`, {method: 'POST'}).then((output) => {
        console.log("omg");
        console.log(output.json);
        return output.json();
    }).then((output) => {
        console.log("hhahaba");
        console.log(output);
    }).catch((error) => {
        console.error(error);
    })
}

