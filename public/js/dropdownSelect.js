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
