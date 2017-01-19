//lazyload
 $(document).ready(function() {
    $("img.lazy").show().lazyload({
        placeholder: "/../public/wapsite/images/point/f-bg.gif",
        skip_invisible: false,
        effect: "fadeIn",
        threshold: 50,


    });
});
// $(document).ready(function() {
//     $("img.lazy").show().lazyload({
//         placeholder: "/../public/wapsite/images/point/f-bg.gif",
//         effect: "fadeIn",
//         skip_invisible: false,
//         threshold: 100,

//     });
// });
//banner滚动
// var swiper1 = new Swiper('.swiper1', {
//     pagination: '.swiper-pagination1',
//     preloadImages: false,
//     lazyLoading: true, // 滚动加载
//     paginationClickable: true,
//     // spaceBetween: 0,
//     // centeredSlides: true,
//     // autoplay: 2500,
//     // autoplayDisableOnInteraction: false,
//     loop: true,
//       observer:true,//修改swiper自己或子元素时，自动初始化swiper
//         observeParents:true,//修改swiper的父元素时，自动初始化swiper
// });
//iscroll
var myScroll;

function loaded() {
    myScroll = new IScroll('#sales-wrapper', {
        eventPassthrough: true,
        // scrollX: false,
        // scrollY: true,
        preventDefault: false   
    });
    //     myScroll = new IScroll('#app-scroller', {
    //     eventPassthrough: true,
    //     scrollX: true,
    //     scrollY: false,
    //     preventDefault: false
    // });
}
   // window.addEventListener("DOMContentLoaded",loaded,false);
//brand导航栏
// $(function () {
//     var nav_w = $(".app-scroller li").first().width();
//     var fl_w = $(".app-scroller").width();
//     var flb_w = $(".app-scroller-wrap").width();

//     $(".app-scroller li").on("click", function() {
//         nav_w = $(this).width();
//         $(".choose-items-wp p").stop(true);
//         $(".choose-items-wp p").animate({ left: $(this).position().left }, 300);
//         $(".choose-items-wp p").animate({ width: nav_w });
//         var fn_w = ($(".app-scroller-wrap").width() - nav_w) / 2;

//         var fnl_l;
//         var fnl_x = parseInt($(this).position().left);
//         $(this).addClass('act').siblings().removeClass('act');
//         if (fnl_x <= fn_w) {
//             fnl_l = 0;
//         } else if (fn_w - fnl_x <= flb_w - fl_w) {
//             fnl_l = flb_w - fl_w;
//         } else {
//             fnl_l = fn_w - fnl_x;
//         }
//         $(".app-scroller").animate({
//             "left": fnl_l
//         }, 300);
//         sessionStorage.left = fnl_l;
//         var c_nav = $(this).find("a").text();
//         navName(c_nav);
//     });

//     $(".app-scroller").on('touchstart', function(e) {
//         var touch1 = e.originalEvent.targetTouches[0];
//         x1 = touch1.pageX;
//         y1 = touch1.pageY;
//         ty_left = parseInt($(this).css("left"));
//     });
//     $(".app-scroller").on('touchmove', function(e) {
//         var touch2 = e.originalEvent.targetTouches[0];
//         var x2 = touch2.pageX;
//         var y2 = touch2.pageY;
//         if (ty_left + x2 - x1 >= 0) {
//             $(this).css("left", 0);
//         } else if (ty_left + x2 - x1 <= flb_w - fl_w) {
//             $(this).css("left", flb_w - fl_w);
//         } else {
//             $(this).css("left", ty_left + x2 - x1);
//         }
//         if (Math.abs(y2 - y1) > 0) {
//             e.preventDefault();
//         }
//     });

// });
// js-search
$('.on-blur .search-bar').on('click', function() {
    $('header').addClass('js-header');
    $('.scroll-wrapper').hide();
    $('.on-blur').removeClass('on-blur').addClass('on-focus');
    $('.scroll-wrapper').hide();
    $('.search-wrap').show();
    $('.th-search-box a.class').hide();
    $('.th-search-box a.backbtn').show();
});

$('#searchInput').on('keyup', function(e) {
    $('.search-bar input').css('width', '80%');
    var uVal = $("#searchInput").val();
    if (uVal !== "") {
         if (e.keyCode == 13) {
            skey = uVal;
            search_cache();
        }
        $('#del').show();
    } else {
        $('#del').hide();
    }
});



$('.th-search-box a.backbtn').on('click', function() {
    del();
    $('#searchInput').blur();
    $('header').removeClass('js-header');
    $('.on-focus').removeClass('on-focus').addClass('on-blur');
    // $('.search-bar input').val('');
    $('.scroll-wrapper').show();
    $('.search-wrap').hide();
    $('.th-search-box a.class').show();
    $('.th-search-box a.backbtn').hide();
});
function del() {
        $('#searchInput').val("").focus();
        $('#del').hide();
        $('.search-bar input').css('width', '100%');
};