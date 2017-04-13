import React from 'react';
var SalesWrapper = React.createClass({
    getInitialState: function() {
        return {
            loading: true,
            error: null,
            data: null
        };
    },
    funStoreUpItem: function(upItem) {
        window.localStorage.upItem = upItem;
    },
    componentDidMount: function() {
        $.getJSON("http://dev.thgo8.com/?g=WapSite&c=Exchange&a=sales_volume", function(value) {
            // console.log(bann_top.advList[0].adv_img);
            if (this.isMounted()) {
                this.setState({
                    loading: false,
                    data: value
                });
                $("img.lazy").show().lazyload({
                    container: $("#sales-wrapper"),
                    effect: "fadeIn"
                });
            }

        }.bind(this));


    },
    componentDidUpdate() {
        let upItem = '';
        const _this = this
        $('a.upItem').on('click', function() {
            upItem = $(this).attr('data-id');
            _this.funStoreUpItem(upItem);
        });
    },
    render: function() {
        if (this.state.loading) {
            return <span > Loading... </span>;
        } else {
            var Sales = this.state.data.goods_list;

            function Shtml() {
                var scrollerHtml = '';
                for (var i = 0; i < Sales.length; i++) {
                    var sales_top = ''

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
                    // href="detail.html"
                    scrollerHtml += '<li ><a class="upItem" data-id="' + Sales[i].item_id + '" href="detail.html" ><div class="info-img"><div class="top ' + sales_top + '"></div><img alt="" class="lazy"   data-original="' + Sales[i].list_image + '"/></div><div class="info-bar"><div class="pro-title">' + Sales[i].goods_name + '</div><div class="e-numb"><span class="e-price"><em>' + Sales[i].item_price + '</em>积分</span></div></div></a> </li>';
                }
                return scrollerHtml;
            }
            return (
                <div id="sales-wrapper">
                <div id="scroller" className="list">
            <ul dangerouslySetInnerHTML=
                        {{__html:Shtml()}}
                        />
                    </div>
</div>
            );

        }
    }
})


export default SalesWrapper;