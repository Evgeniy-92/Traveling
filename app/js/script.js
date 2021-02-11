new Swiper('.articles-slider', {
    navigation: {
        nextEl: '.articles-arrow',
    },
    slidesPerView: 3,
    loop: true,
});

new Swiper('.clients-slider', {
    navigation: {
        nextEl: '.clients-arrow',
    },
    slidesPerView: 4,
    loop: true,
});

$('.wr-portfolio__slick').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    focusOnSelect: true,
    speed: 1000,
    // centerMode: true,
    // initialSlide: 2, /* начать со второго слайда */
    // variableWidth: true
});


