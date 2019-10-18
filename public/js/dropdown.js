$(document).ready(function(){
    $(".dropdown").mouseover(function () {
        console.log("here");
        $(".dropdown-menu").slideDown('slow');
    });

});