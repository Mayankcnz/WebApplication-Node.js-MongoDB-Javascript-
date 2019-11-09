

function submitF(form) {
    var letters = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
    var email = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    var number =  /^\d+$/;
    // check all the fields before submitting the form
    var fullName = $("#fname").val(); 
    var email = $("#email").val(); 
    var address = $("#adr").val(); 
    var city = $("#city").val(); 
    var state = $("state").val(); 
    var zip = $("#zip").val(); 
    var nameOnCard = $("#cname").val(); 
    var creditCardNumber = $("#ccnum").val(); 
    var expMonth = $("#expmonth").val(); 
    var expYear = $("#expyear").val(); 
    var CVC= $("#cvv").val(); 

    if((fullName !== null && fullName.match(letters)) && (email !== null && email.match(email)) && address !== null &&
    (city !== null && city.match(letters)) && state !== null && 
    (zip !== null && zip.match(number)) && (nameOnCard !== null && nameOnCard.match(letters)) &&
    (creditCardNumber !== null && creditCardNumber.match(number)) && expMonth !== null &&
    expYear !== null && CVC !== null
    ){

        var obj = {
            name:fullName,
            email: email,
            address: address,
            city: city, 
            state: state,
            zip: zip,
            nameOnCard: nameOnCard,
            creditCardNumber: creditCardNumber,
            expMonth: expMonth,
            expYear: expYear,
            CVC: CVC
        }
        $.ajax({
            url: `/cart/checkout/`,
            type: "POST",
            data: {formData:obj},
            success: function(data, textStatus, jqXHR) {
              if(data.error) {
                alert('Error occured!')
              }else {
                alert('Success!');
              }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Error occurred!');
            }
        
        });
        

    } else {
      alert('Some fields are invalid!')
    }
}
