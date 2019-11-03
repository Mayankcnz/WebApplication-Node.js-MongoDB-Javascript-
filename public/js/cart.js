$(document).ready(function() {

    
    $("#clicked-cart").click(function(e){

      console.log("get card");
        // get the priduct id on click and do an ajax call to the server to add the prouct to the cart database
      fetch(`/cart/`, {method: 'GET'}).then((output) => {
        console.log(output.json);
       console.log("here");
       return output.json();
  }).then((output) => {
      console.log(output);
  }).catch((error) => {
      console.error(error);
  })
      });
    
   

});