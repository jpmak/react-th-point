import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
const urlRoot = 'http://dev.thgo8.com/'

class SalesWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Shtml: [],
            loading: true,
            error: null,
            data: null
        };

    }
    funStoreUpItem(upItem) {
        window.localStorage.upItem = upItem;
    }
    componentDidMount() {
        fetch(urlRoot + '?g=WapSite&c=Exchange&a=sales_volume', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    Shtml: data.goods_list

                });



                // 
                $("img.lazy").show().lazyload({
                    container: $("#sales-wrapper"),
                    effect: "fadeIn"
                });

            })
            .catch(function(e) {
                console.log("加载失败");
            });
    }


    componentDidUpdate() {
        let upItem = '';
        const _this = this
        $('a.upItem').on('click', function() {
            upItem = $(this).attr('data-id');
            _this.funStoreUpItem(upItem);
        });
    }
    render() {

        let goodsHtmls = this.state.Shtml;
        let goodsList = goodsHtmls.map(function(goods, index) {
            var sales_top = 'top '
            switch (index) {
                case 0:
                    sales_top = 'top t1';
                    break;
                case 1:
                    sales_top = 'top t2';
                    break;
                case 2:
                    sales_top = 'top t3';
                    break;
            }
            return (

                <li key={index}><Link to="/jf.html/R_det" className="upItem" data-id={goods.item_id}  ><div className="info-img"><div className={sales_top}></div><img alt="" className="lazy"   data-original={goods.list_image} /></div><div className="info-bar"><div className="pro-title">{goods.goods_name} </div><div className="e-numb"><span className="e-price"><em>{goods.item_price} </em>积分</span></div></div></Link> </li>

            )

        });
        return (
            <div id="sales-wrapper">
                <div id="scroller" className="list">
                        <ul>{goodsList}</ul>
                    </div>
</div>
        );

    }
}


export default SalesWrapper;