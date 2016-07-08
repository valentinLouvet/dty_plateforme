
//jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

var collapsed = true;

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('.collapse').collapse('hide');
        $($anchor.attr('href')).collapse('show');
        collapsed = !collapsed;
        //console.log(document.getElementById(($anchor.attr('href')).replace('#','')).classList.contains('ui-collapsible-collapsed'));
        //console.log($("#courseLessons").hasClass('ui-collapsible-collapsed'));
        console.log(collapsed);
        if(!collapsed)
            {
                $('html, body').stop().animate({
                    scrollTop: $($anchor.attr('href')).offset().top
                }, 1500, 'easeInOutExpo');
            }
        event.preventDefault();
    });
});
