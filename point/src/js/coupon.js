//lazyload
$(document).ready(function() {
    $("img.lazy").show().lazyload({
        placeholder: "/../public/wapsite/images/point/f-bg.gif",
        effect: "fadeIn",
         skip_invisible : false,
        threshold: 0,

    });
});
//banner滚动
var swiper1 = new Swiper('.swiper1', {
    pagination: '.swiper-pagination1',
    preloadImages: false,
    lazyLoading: true, // 滚动加载
    paginationClickable: true,
    spaceBetween: 0,
    centeredSlides: true,
    autoplay: 2500,
    autoplayDisableOnInteraction: false,
    loop: true,
});
