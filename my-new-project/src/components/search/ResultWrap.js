import React from 'react';
var page_state = 1;
var page = 0;
var volume = '';
var keyword = '';
var price = '';
var c_id = '';
var arrval = new Array();
class ResultWrap extends React.Component {
    // getInitialState() {
    //     return {
    //         // loading: true,
    //         // data: null

    //     };
    // }
    // 

    componentWillMount() {
        this.handload()
    }
    handload() {
        const _this = this;

        $.ajax({
            url: 'http://dev.thgo8.com/?g=WapSite&c=Exchange&a=search_goods',
            type: 'POST',
            dataType: 'json',
            Thread: true,
            data: {
                'keyword': keyword,
                'volume': volume,
                'by': price,
                'page': page
            },

            error: function() {
                alert('网络连接失败！');
            },
            success: function(data) {

                var searchHtml = '';
                if (data.status) {
                    $('.result-sort').show();
                    for (var i = 0; i < data.goods_list.length; i++) {
                        searchHtml += '<li><a href="Exchange-goods-' + data.goods_list[i].item_id + '.html"><div class="info-img"><div><img alt=""class="lazy"data-original="' + data.goods_list[i].list_image + '"></div></div><div class="info-bar"><div class="pro-title">' + data.goods_list[i].goods_name + '</div><div class="e-numb"><span class="e-price"><em>' + data.goods_list[i].item_price + '</em>积分</span></div></div></a></li>'
                    }
                    if (page === 0) {
                        $('.app-pd-list ul').html(searchHtml);
                    } else {
                        $('.app-pd-list ul').append(searchHtml);
                        page_state = 1;
                        $('.load-tip').hide();
                    }
                } else {

                    if (page > 0) {
                        $('.load-tip').show().html("没有更多数据了");
                    } else {
                        var liHtml = '';
                        page_state = 0;
                        liHtml += '<div class="none-data"></div>';

                        $('.app-pd-list ul').html(liHtml);
                    }
                    Load.hide();
                }
                $('img.lazy').show().lazyload({
                    placeholder: '/images/f-bg.gif',
                    effect: 'fadeIn',
                    skip_invisible: false,
                    threshold: 100
                });
            }
        });

        var winH = $(window).height();
        $(window).scroll(function() {
            var pageH = $(document.body).height();
            var scrollT = $(window).scrollTop();
            var rate = (pageH - winH - scrollT) / winH;
            if (page_state == 1) {
                if (rate < 0.01) {
                    page++;
                    page_state = 0;
                    _this.handload();
                    $('.load-tip').show().html('<i class="r-gif"></i><span>正在载入</span>');
                }
            }
        });
    }
    render() {
        return (
            <div className="w result-wp">
        <div className="result-sort">
            <li className="cur">综合</li>
            <li className="volume">兑换排行</li>
            <li className="arrow price">香蕉</li>
            <li className="icons-list ver-icon"></li>
        </div>
        <div className="app-pd-list hor-list">
            <ul>
  
            </ul>
        </div>
        <div className="load-tip"></div>
    </div>
        );
    }
}

export default ResultWrap;