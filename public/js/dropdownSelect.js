/*Dropdown Menu*/
$(document).ready(function() {
$('.shoedropdown').click(function () {
    $(this).attr('tabindex', 1).focus();
    $(this).toggleClass('active');
    $(this).find('.shoedropdown-menu').slideToggle(300);
});
$('.shoedropdown').focusout(function () {
    $(this).removeClass('active');
    $(this).find('.shoedropdown-menu').slideUp(300);
});
$('.shoedropdown .shoedropdown-menu li').click(function () {
    $(this).parents('.shoedropdown').find('span').text($(this).text());
    $(this).parents('.shoedropdown').find('input').attr('value', $(this).attr('id'));
});
});
/*End Dropdown Menu*/

/**
$('.dropdown-menu li').click(function () {
var input = '<strong>' + $(this).parents('.dropdown').find('input').val() + '</strong>',
  msg = '<span class="msg">Hidden input value: ';
$('.msg').html(msg + input + '</span>');
}); 
});

 */