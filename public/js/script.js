const addToCart = (id) =>{

  console.log("HI");
  
  var span_Text = document.getElementById("span_text").innerText;
  if( isNaN(span_Text)){
    alert("Shoe size must be specified");
    return;
  }

  $.ajax({
    url: `/cart/add/${id}`,
    type: "POST",
    data: {size:span_Text},
    success: function(data, textStatus, jqXHR) {
        alert('Success!');
    },
    error: function(jqXHR, textStatus, errorThrown) {
        alert('Error occurred!');
    }

});
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