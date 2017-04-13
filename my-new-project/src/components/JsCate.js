import React from 'react';
let page = 0;
let page_state = 1;
let event = '';
var JsPrduct = React.createClass({
    getInitialState: function() {
        return {
            loading: true,
            data: null

        };
    },

    render: function() {
        return (
            <div>
            <div className="app-pd-wp">
                <div className="app-pd-list">
                   <ul></ul>
                    </div>
                    </div>
                    <div className="load-tip"></div>
                    </div>
        )
    }
})


var App = React.createClass({
    getInitialState: function() {
        return {
            loading: true,
            error: null,
            data: null,
            message: '',
            event: 1,
            data_p: null
        };
    },

    componentDidMount: function() {
        $.getJSON('http://dev.thgo8.com/?g=WapSite&c=Exchange&a=get_cate_list',
            function(value) {
                if (this.isMounted()) {
                    this.setState({
                        loading: false,
                        data_p: null,
                        data: value
                    });
                    var nav_w = $('.app-scroller li').first().width();
                    var fl_w = $('.app-scroller').width();
                    var flb_w = $('.app-scroller-wrap').width();
                    $('.choose-items-wp p').width(nav_w);
                    $('.app-scroller li').on('click', function() {
                        page = 0;
                        page_state = 1;
                        event = $(this).attr('id');
                        nav_w = $(this).width();
                        $('.choose-items-wp p').stop(true);
                        $('.choose-items-wp p').animate({
                            left: $(this).position().left
                        }, 300);
                        $('.choose-items-wp p').animate({
                            width: nav_w
                        });
                        var fn_w = ($('.app-scroller-wrap').width() - nav_w) / 2;

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
                        $('.app-scroller').animate({
                            'left': fnl_l
                        }, 300);
                        sessionStorage.left = fnl_l;
                        var c_nav = $(this).find('a').text();
                        // navName(c_nav);
                    });
                    $('.choose-items-wp li').first().addClass('act').trigger('click');

                    // 初始化
                }
            }.bind(this));

        const _this = this
        $('.app-pd-list li').on('click', function() {
            // upItem = $(this).attr('data-id');
            console.log(12);
            // _this.funStoreUpItem();
        });


    },
    funStoreUpItem: function(upItem) {
        window.localStorage.upItem = upItem;
    },

    // componentDidUpdate() {
    //     const _this = this
    //     $('a.upItem').on('click', function() {
    //         // upItem = $(this).attr('data-id');
    //         console.log(12);
    //         // _this.funStoreUpItem();
    //     });
    // },
    handleClick: function() {
        // this.setState({
        // })
        const _this = this;
        let upItem = '';
        $.ajax({
            url: 'http://dev.thgo8.com/?g=WapSite&c=Exchange&a=get_cate_goods',
            type: 'POST',
            dataType: 'json',
            data: {
                'cate_id': event,
                'page': page
            },
            success: function(data) {
                let cate_listHtml = '';
                if (data.status) {
                    for (var i = 0; i < data.goods_list.length; i++) {
                        // href="Exchange-goods-' + data.goods_list[i].item_id + '.html"
                        cate_listHtml += '  <li><a href="detail.html"  class="upItem" data-id="' + data.goods_list[i].item_id + '"><div class="info-img"><img alt="" class="lazy" data-original="' + data.goods_list[i].list_image + '"></div><div class="info-bar"><div class="pro-title">' + data.goods_list[i].goods_name + '</div><div class="e-numb"><span class="e-price"><em>' + data.goods_list[i].item_price + '</em>积分</span></div></div></a></li>';
                    }

                    if (page === 0) {
                        $('.app-pd-list ul').html(cate_listHtml);
                    } else {
                        $('.app-pd-list ul').append(cate_listHtml);
                        page_state = 1;
                        $('.load-tip').hide();
                    }

                } else {
                    if (page === 0) {
                        var liHtml = '';
                        liHtml += '<div class="none-data"></div>';
                        $('.app-pd-list ul').html(liHtml);
                        $('.load-tip').hide();
                        page_state = 0;
                    } else {
                        $('.load-tip').show().html('没有更多数据了');

                    }
                }
                // else end
                $('.app-pd-list img.lazy').show().lazyload({
                    skip_invisible: false,
                    effect: 'fadeIn',
                    threshold: 0
                });
                $('a.upItem').on('click', function() {
                    upItem = $(this).attr('data-id');
                    _this.funStoreUpItem(upItem);
                });
            }
        });

        var winH = $(window).height();
        $(window).scroll(function() {
            var pageH = $(document.body).height();
            var scrollT = $(window).scrollTop();
            var rate = (pageH - winH - scrollT) / winH;
            if (page_state === 1) {
                if (rate < 0.01) {
                    page++;
                    page_state = 0;
                    _this.handleClick(event);
                    $('.load-tip').show().html('<i class="r-gif"></i><span>正在载入</span>');

                }
            }
        });

    },

    render: function() {
        if (this.state.loading) {
            return <span > Loading... </span>;
        } else {
            var Cates = this.state.data.cate_list;
            var self = this;
            var CateList = Cates.map(function(Cate, index) {
                // var indexS = index.shift();


                return (
                    <li key={index} id={Cate.cate_id}  onClick={self.handleClick.bind(self,Cate.cate_id)}><a><span>{Cate.cate_name}</span></a></li>
                );
            });
            return (
                <div>
                    <div id="app-scroller" className="app-scroller-wrap" style={{'height': '.75rem'}}>
                        <div className="app-scroller">
                            <ul className="choose-items-wp">
                            {CateList}
                                <p style={{'top':'.7rem'}}><b></b></p>
                            </ul>
                        </div>
                    </div>
            <JsPrduct/>
                </div>
            )

        }
    }
})

export {
    App,
    JsPrduct
};