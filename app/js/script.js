new Swiper('.articles-slider', {
    navigation: {
        nextEl: '.articles-arrow',
    },
    slidesPerView: 2,
    loop: true,

    breakpoints: {
        921: {
            slidesPerView: 2,

        },
        1112: {
            slidesPerView: 3,
        },
        
    }
});

new Swiper('.clients-slider', {
    navigation: {
        nextEl: '.clients-arrow',
    },
    slidesPerView: 3,
    loop: true,
    breakpoints: {
        922: {
            slidesPerView: 4,

        },
        
    }
});

$('.wr-portfolio__slick').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    focusOnSelect: true,
    speed: 1000,
    // responsive: [
    //     {
    //         breakpoint: 1024,
    //         settings: {
    //             slidesToShow: 1,
    //             slidesToScroll: 1
    //           }
    //     },
    // ]    
    
});

$(document).ready(function() {
    $('.burger').click(function(e) {
        $('.burger,.nav').toggleClass('active');
    })
})


