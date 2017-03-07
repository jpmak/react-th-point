user_info();
sales_volume();
get_cate_list();
// search_history();
$(function() {
    // var funStoreHistory = function() {
    //     var arrval = [];

    //     arrval.unshift($("#searchInput").val());


    //     //存储，IE6~7 cookie 其他浏览器HTML5本地存储
    //     if (window.localStorage) {
    //         localStorage.setItem('searchhistory', JSON.stringify(arrval));

    //     } else {
    //         Cookie.write(searchhistory, arrval);
    //     }
    // };
    var searchMsg = '';
    var arrval = new Array();
    var historyHtml = function() {
        history_Html = '';
        for (var i = 0; i < searchMsg.length; i++) {
            history_Html += '<li><a>' + searchMsg[i].keyword + '</a></li>';
        }
        $('.search-keywords-list').html(history_Html);

    }
    if (window.localStorage.searchhistory) {
        searchMsg = JSON.parse(window.localStorage.searchhistory);
        // arrval.push(searchMsg);
        historyHtml();
        arrval = arrval.concat(searchMsg);


    } else {
        $('.search-keywords').hide();
    }

    var funStoreHistory = function() {
        // window.localStorage.searchhistory = '';
        arrval.unshift({
            'keyword': $("#searchInput").val()
        });
        if (arrval.length > 9) {
            arrval.pop(9);
        }
        window.localStorage.searchhistory = JSON.stringify(arrval);
    };
    get_index_Banner();
    $('a.search-btn').on('click', function() {

        var sVal = $("#searchInput").val();
        if (sVal !== '') {
            funStoreHistory();
            // console.log($("#searchInput").val());
            skey = sVal;
            search_cache();
        }
    });

    $('.search-keywords-list li a').on('click', function() {
        var hVal = $(this).html();
        skey = hVal;
        window.location.href = "search.html";
    });
    //存储loaclstorage



});



Load.show();
var page = 0;
var page_state = 1;
var cate_list_type = 0;
var skey = '';
//商品一级分类
function get_cate_list() {
    cate_list_Html = '';
    $.ajax({
        url: 'http://dev.thgo8.com/?g=WapSite&c=Exchange&a=get_cate_list',
        type: 'POST',
        dataType: 'json',
        complete: function() {
            Load.hide();
        },
        error: function() {
            alert('网络连接失败！');
        },
        success: function(data, textStatus, xhr) {
            if (data.status) {
                var sales_top = '';
                for (var i = 0; i < data.cate_list.length; i++) {

                    cate_list_Html += '<li onclick="cate_list_state(' + data.cate_list[i].cate_id + ')"><a><span>' + data.cate_list[i].cate_name + '</span></a></li>';
                }
                cate_list_state(data.cate_list[0].cate_id);
                $('.choose-items-wp').append(cate_list_Html);
                $('.choose-items-wp li').first().addClass('act');
                // 初始化
                $(function() {
                    var nav_w = $(".app-scroller li").first().width();
                    var fl_w = $(".app-scroller").width();
                    var flb_w = $(".app-scroller-wrap").width();
                    $(".choose-items-wp p").width(nav_w);
                    $(".app-scroller li").on("click", function() {

                        Load.show();
                        nav_w = $(this).width();
                        $(".choose-items-wp p").stop(true);
                        $(".choose-items-wp p").animate({
                            left: $(this).position().left
                        }, 300);
                        $(".choose-items-wp p").animate({
                            width: nav_w
                        });
                        var fn_w = ($(".app-scroller-wrap").width() - nav_w) / 2;

                        var fnl_l;
                        var fnl_x = parseInt($(this).position().left);
                        $(this).addClass('act').siblings().removeClass('act');
                        if (fnl_x <= fn_w) {
                            fnl_l = 0;
                        } else if (fn_w - fnl_x <= flb_w - fl_w) {
                            fnl_l = flb_w - fl_w;
                        } else {
                            fnl_l = fn_w - fnl_x;
                        }
                        $(".app-scroller").animate({
                            "left": fnl_l
                        }, 300);
                        sessionStorage.left = fnl_l;
                        var c_nav = $(this).find("a").text();
                        // navName(c_nav);
                    });

                    $(".app-scroller").on('touchstart', function(e) {
                        var touch1 = e.originalEvent.targetTouches[0];
                        x1 = touch1.pageX;
                        y1 = touch1.pageY;
                        ty_left = parseInt($(this).css("left"));
                    });
                    $(".app-scroller").on('touchmove', function(e) {
                        var touch2 = e.originalEvent.targetTouches[0];
                        var x2 = touch2.pageX;
                        var y2 = touch2.pageY;
                        if (ty_left + x3 - x1 >= 0) {
                            $(this).css("left", 0);
                        } else if (ty_left + x2 - x1 <= flb_w - fl_w) {
                            $(this).css("left", flb_w - fl_w);
                        } else {
                            $(this).css("left", ty_left + x2 - x1);
                        }
                        if (Math.abs(y2 - y1) > 0) {
                            e.preventDefault();
                        }
                    });
                });
                // 初始化

            }
        }
    });
}

function cate_list_state(obj) {
    cate_list_type = obj;
    page_state = 1;
    page = 0;

    get_cate_goods();
}
//商品分类对应商品



function get_cate_goods() {
    $.ajax({
        url: 'http://dev.thgo8.com/?g=WapSite&c=Exchange&a=get_cate_goods',
        type: 'POST',
        dataType: 'json',
        data: {
            'cate_id': cate_list_type,
            'page': page
        },

        complete: function() {
            Load.hide();
        },

        error: function() {
            alert('网络连接失败！');
        },
        success: function(data, textStatus, xhr) {
            var cate_listHtml = '';
            if (data.status) {
                Load.hide();
                var sales_top = '';
                for (var i = 0; i < data.goods_list.length; i++) {
                    cate_listHtml += '  <li><a href="Exchange-goods-' + data.goods_list[i].item_id + '.html"><div class="info-img"><img alt="" class="lazy" data-original="' + data.goods_list[i].list_image + '"></div><div class="info-bar"><div class="pro-title">' + data.goods_list[i].goods_name + '</div><div class="e-numb"><span class="e-price"><em>' + data.goods_list[i].item_price + '</em>积分</span></div></div></a></li>';
                }
                // 
                if (page === 0) {
                    $('.app-pd-list ul').html(cate_listHtml);

                } else {
                    $('.app-pd-list ul').append(cate_listHtml);
                    page_state = 1;
                    $('.load-tip').hide();
                }

                Load.hide();
            } else {
                if (page === 0) {
                    var liHtml = '';
                    liHtml += '<div class="none-data"></div>';
                    $('.app-pd-list ul').html(liHtml);
                    $('.load-tip').hide();
                    page_state = 0;
                } else {
                    $('.load-tip').show().html("没有更多数据了");

                }
            }
            // else {
            //     var liHtml = '';
            //     liHtml += '<div class="none-data"></div>';
            //     if (page == 0) {
            //         page_state == 0;
            //         $('.app-pd-list ul').html(liHtml);
            //         console.log(page);
            //         $('.load-tip').hide();
            //     } else {
            //               console.log(123);
            //         $('.load-tip').show().html("没有更多数据了");
            //     }
            // }
            $(".app-pd-list img.lazy").show().lazyload({
                placeholder: "/src/images/f-bg.gif",
                skip_invisible: false,
                effect: "fadeIn",
                threshold: 0,
            });
        }
    });
}

var winH = $(window).height();
$(window).scroll(function() {
    var pageH = $(document.body).height();
    var scrollT = $(window).scrollTop();
    var rate = (pageH - winH - scrollT) / winH;
    if (page_state == 1) {
        if (rate < 0.01) {
            page++;
            page_state = 0;
            get_cate_goods();
            $('.load-tip').show().html('<i class="r-gif"></i><span>正在载入</span>');

        }
    }
});

//排行榜

function sales_volume() {
    scrollerHtml = '';
    $.ajax({
        url: 'http://dev.thgo8.com/?g=WapSite&c=Exchange&a=sales_volume',
        type: 'POST',
        dataType: 'json',
        complete: function() {
            Load.hide();
        },
        'error': function() {
            alert('网络连接失败！');
        },
        success: function(data, textStatus, xhr) {
            if (data.status) {
                var sales_top = '';
                for (var i = 0; i < data.goods_list.length; i++) {
                    switch (i) {
                        case 0:
                            sales_top = 't1';
                            break;
                        case 1:
                            sales_top = 't2';
                            break;
                        case 2:
                            sales_top = 't3';
                            break;
                        case 3:
                            sales_top = '';
                            break;
                    }
                    scrollerHtml += '<li><a href="Exchange-goods-' + data.goods_list[i].item_id + '.html"><div class="info-img"><div class="top ' + sales_top + '"></div><img alt="" class="lazy"   data-original="' + data.goods_list[i].list_image + '"></div><div class="info-bar"><div class="pro-title">' + data.goods_list[i].goods_name + '</div><div class="e-numb"><span class="e-price"><em>' + data.goods_list[i].item_price + '</em>积分</span></div></div></a> </li>';
                }
                $('#sales-wrapper #scroller ul').html(scrollerHtml);
                $("img.lazy").show().lazyload({
                    container: $("#sales-wrapper"),
                    effect: "fadeIn",

                });
            } else {
                $('#sales-wrapper').remove();
            }
        }
    });
}


//获取积分参数

function user_info() {
    $.ajax({
        url: 'http://dev.thgo8.com/?g=WapSite&c=Exchange&a=user_info',
        type: 'POST',
        dataType: 'json',
        complete: function() {
            Load.hide();
        },
        error: function() {
            alert('网络连接失败！');
        },
        success: function(data, textStatus, xhr) {
            if (data.status) {
                $('#record-num').html(data.info.banana);
            } else {
                $('#record-num').html(0);
            }

        }
    });
}


//获取积分商城banner
function get_index_Banner() {
    bannerHtml = '';
    bann_foo1_html = '';
    bann_foo2_html = '';
    $.ajax({
        url: 'http://dev.thgo8.com/?g=WapSite&c=Exchange&a=get_index_Banner',
        type: 'POST',
        dataType: 'json',
        complete: function() {
            Load.hide();
        },
        error: function() {
            alert('网络连接失败！');
        },
        success: function(data, textStatus, xhr) {
            if (data.status) {
                var href = '';
                for (var i = 0; i < data.bann_top.advList.length; i++) {

                    if (data.bann_top.advList[i].adv_url !== '') {
                        href = 'href="' + data.bann_top.advList[i].adv_url + '"';
                    } else {
                        href = '';
                    }
                    bannerHtml += '<div class="swiper-slide"><a ' + href + '><img class="swiper-lazy"  data-src="' + data.bann_top.advList[i].adv_img + '"  ></a></div>';
                }
                $('.swiper-wrapper').html(bannerHtml);

                var bann_foo1_href = '';
                if (data.bann_foo1.advList.length > 0) {
                    if (data.bann_foo1.advList[0].adv_url !== '') {
                        bann_foo1_href = 'href="' + data.bann_foo2.advList[0].adv_url + '"';
                    } else {
                        bann_foo2_href = '';
                    }
                    bann_foo1_html += '<a ' + bann_foo1_href + '><img class="img-banner" src="' + data.bann_foo1.advList[0].adv_img + '"></a>';

                    $('#js-banner').html(bann_foo1_html);
                } else {
                    $('#js-banner').remove();
                }
                var bann_foo2_href = '';
                if (data.bann_foo2.advList.length > 0) {
                    if (data.bann_foo2.advList[0].adv_url !== '') {
                        bann_foo2_href = 'href="' + data.bann_foo2.advList[0].adv_url + '"';
                    } else {
                        bann_foo2_href = '';
                    }
                    bann_foo2_html += '<a ' + bann_foo2_href + '><img class="lazy" src="' + data.bann_foo2.advList[0].adv_img + '"></a>';
                    $('#js-banner-2').html(bann_foo2_html);
                } else {
                    $('#js-banner-2').remove();
                }
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
                    observer: true, //修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true, //修改swiper的父元素时，自动初始化swiper
                });
            }
            $("img.lazy").show().lazyload({
                placeholder: "/src/images/f-bg.gif",
                skip_invisible: false,
                effect: "fadeIn",
                threshold: 50,
            });
        }
    });
}



// function search_history() {

//     $.ajax({
//         url: 'http://dev.thgo8.com/?g=WapSite&c=Exchange&a=search_history',
//         type: 'get',
//         dataType: 'json',
//         // data: {

//         // },
//         erro: function() {
//             alert('网络连接失败！');
//         },
//         success: function(data) {
//             var historyHtml = '';
//             if (data) {
//                 for (var i = 0; i < data.length; i++) {
//                     historyHtml += '<li><a>' + data[i] + '</a></li>';
//                 }
//                 $('.search-keywords-list').html(historyHtml);

//             }


//         }
//     });
// }

// get_index_Banner()

function search_cache() {

    $.ajax({
        url: 'http://dev.thgo8.com/?g=WapSite&c=Exchange&a=search_cache',
        type: 'POST',
        dataType: 'json',
        data: {
            'kd': skey,
        },
        complete: function() {
            Load.hide();
        },

        erro: function() {
            alert('网络连接失败！');
        },
        success: function(data, textStatus, xhr) {
            if (data.status) {
                window.location.href = "search.html";
            }


        }
    });
}

$(document).ready(function() {
    $("img.lazy").show().lazyload({
        placeholder: "/src/images/f-bg.gif",
        skip_invisible: false,
        effect: "fadeIn",
        threshold: 50,


    });
});

var myScroll;

function loaded() {
    myScroll = new IScroll('#sales-wrapper', {
        eventPassthrough: true,

        preventDefault: false
    });

}

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
}