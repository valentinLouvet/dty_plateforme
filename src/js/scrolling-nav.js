


//jQuery for page scrolling feature - requires jQuery Easing plugin

function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function scrollTo(link, event ,show){
    if(show){
        $(link).collapse('show');
        if(!isScrolledIntoView(link)){
            $('html, body').stop().animate({
                scrollTop: $(link).offset().top-300
            }, 1500, 'easeInOutExpo');
        }

    }
    else{
        $(link).collapse('toggle');
    }

    event.preventDefault();
}

function replaceByValue(a,b){
    while(b.length>0){
        b.pop();
    }
    while(a.length>0){
        b.unshift(a.pop());
    }
}