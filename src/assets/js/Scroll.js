import $ from "jquery";

$(function() {

    /* Fixed Header*/
    let header = $("#header");
    let festival = $("#festival");
    let festivalH = festival.innerHeight();
    let scrollPos = parseInt( $(window).scrollTop() );


    $(window).on('scroll load resize', function () {
        festivalH = festival.innerHeight();
        scrollPos = $(this).scrollTop();

        if (scrollPos > festivalH) {
            header.addClass('fixed');
        } else {
            header.removeClass('fixed');
        }
    });


    /* Smooth scroll */
    $("[data-scroll]").on('click', function () {
        event.preventDefault();

        let elemId = $(this).data('scroll');
        let elemOffset = parseInt( $(elemId).offset().top );

        $('html, body').animate({
            scrollTop: elemOffset - 50
        }, 700)

    });


    /* Tooltip*/
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })


});