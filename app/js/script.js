new Swiper('.articles-slider', {
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.articles-arrow__right',
        prevEl: '.articles-arrow__left'
    },

    slidesPerView: 2,
    

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
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.clients-arrow__right',
        prevEl: '.clients-arrow__left'
    },
        
    slidesPerView: 3,

    breakpoints: {
        992: {
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
    // infinite: false,

    responsive: [
        {
          breakpoint: 425,
          settings: {
            slidesToShow: 2,
          }
        },
    ]
});

/* filter section portfolio */
$(".wr-portfolio__item").on('click', function(){
    let filter = $(this).data('filter');
    $(".wr-portfolio__slick").slick('slickUnfilter');
    
    if(filter == 'travels'){
      $(".wr-portfolio__slick").slick('slickFilter','.travels');
    }
    else if(filter == 'hotels'){
      $(".wr-portfolio__slick").slick('slickFilter','.hotels');
    }
    else if(filter == 'restaurants'){
      $(".wr-portfolio__slick").slick('slickFilter','.restaurants');
    }
    else if(filter == 'flight'){
        $(".wr-portfolio__slick").slick('slickFilter','.flight');
      }
    else if(filter == 'all'){
      
      $(".slider").slick('slickUnfilter');
    }
});


let listContainer = document.querySelector('.wr-portfolio__list');
function clearClass(arrElements, classNameEl) {
    for (let i = 0; i < arrElements.length; i++) {
      const item = arrElements[i];
      if(item.classList.contains(classNameEl)) {
        item.classList.remove(classNameEl)
      }
    }
}

listContainer.addEventListener('click', function(e) {
    let currentEl = e.target;
    if(!currentEl.classList.contains('wr-portfolio__item')) return;

    let item = currentEl;
    if(item.classList.contains('wr-portfolio__active')) return;

    let items = this.querySelectorAll('.wr-portfolio__item');
    clearClass(items, 'wr-portfolio__active');
    item.classList.add('wr-portfolio__active');
});


$(document).ready(function() {
    $('.burger').click(function(e) {
        $('.burger,.nav').toggleClass('active');
    })
});


/* секция food */
let container = document.querySelector('.wr-food__container');

function clearClass(arrElements, classNameEl) {
    for (let i = 0; i < arrElements.length; i++) {
      const box = arrElements[i];
      if(box.classList.contains(classNameEl)) {
        box.classList.remove(classNameEl)
      }
    }
}

container.addEventListener('mouseover', function(e) {
    debugger    
    let currentEl = e.target.closest('.wr-food__box');
    if(!currentEl.classList.contains('wr-food__box')) return;

    let block = currentEl;
    if(block.classList.contains('food-active')) return;

    let blocks = this.querySelectorAll('.wr-food__box');
    clearClass(blocks, 'food-active');
    block.classList.add('food-active');
})


