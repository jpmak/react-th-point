import React from 'react';


var SalesWrapper = React.createClass({
    getInitialState: function() {
        return {
            loading: true,
            error: null,
            data: null
        };
    },

    componentDidMount: function() {
        $.getJSON("http://dev.thgo8.com/?g=WapSite&c=Exchange&a=sales_volume", function(value) {
            // console.log(bann_top.advList[0].adv_img);
            if (this.isMounted()) {
                this.setState({
                    loading: false,
                    data: value
                });
            }
            $("img.lazy").show().lazyload({
                container: $("#sales-wrapper"),
                effect: "fadeIn"
            });
        }.bind(this));
    },
    render: function() {
        if (this.state.loading) {
            return <span > Loading... </span>;
        } else {
            var Sales = this.state.data.goods_list;
            var SalesList = Sales.map(function(repo, index) {
                return (<li><a href="Exchange-goods-{repo.item_id}.html"><div className="info-img"><div class="top">{repo.sales_top}</div><img alt="" className="lazy"   data-original= {repo.list_image} /></div><div className="info-bar"><div className="pro-title">{repo.goods_name}</div><div className="e-numb"><span className="e-price"><em>{repo.item_price}</em>积分</span></div></div></a> </li>);

            });
            return (
                <div id="scroller" class="list">
                        <ul>
                        {SalesList}
                        </ul>
                    </div>

            );

        }
    }
})


export default SalesWrapper;