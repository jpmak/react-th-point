import React from 'react';
var JsCate = React.createClass({
    getInitialState: function() {
        return {
            loading: true,
            error: null,
            data: null
        };
    },

    componentDidMount: function() {

        $.getJSON("http://dev.thgo8.com/?g=WapSite&c=Exchange&a=get_cate_list", function(value) {
            if (this.isMounted()) {
                this.setState({
                    loading: false,
                    data: value
                });
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
        }.bind(this));
    },
    render: function() {
        if (this.state.loading) {
            return <span > Loading... </span>;
        } else {
            var Cates = this.state.data.cate_list;

            var CateList = Cates.map(function(Cate, index) {
                // var indexS = index.shift();
                return (
                    <li key={index} ><a><span>{Cate.cate_name}</span></a></li>
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
                </div>
            )

        }
    }
})

var JsPrduct = React.createClass({
    getInitialState: function() {
        return {
            loading: true,
            error: null,
            data: null
        };
    },

    componentDidMount: function() {

        $.getJSON("../json/get_cate_goods.json", function(value) {
            if (this.isMounted()) {
                this.setState({
                    loading: false,
                    data: value
                });
            }

        }.bind(this));
    },
    render: function() {
        if (this.state.loading) {
            return <span > Loading... </span>;
        } else {
            var Prducts = this.state.data.goods_list;
            console.log(123);
            var PrductList = Prducts.map(function(Prduct, index) {
                // var indexS = index.shift();
                return (
                    <li key={index}><a href={'Exchange-goods-' + Prduct.item_id + '.html'}><div class="info-img"><img alt="" class="lazy" data-original= {Prduct.goods_list_image}/></div><div class="info-bar"><div class="pro-title">{Prduct.goods_name}</div><div class="e-numb"><span class="e-price"><em>{Prduct.item_price}</em>积分</span></div></div></a></li>
                );
            });

            return (


                <div className="app-pd-wp">
                <div className="app-pd-list">
                        <ul>
                            {PrductList}

                        </ul>

                        
                            }
                    </div>
                    </div>
            )

        }
    }
})

export {
    JsCate,
    JsPrduct
};