import React from 'react';
import LazyLoad from 'react-lazyload';
import PlaceholderComponent from './public/Placeholder';


import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

class SalesWrapper extends React.Component {



    render() {

        let goodsHtmls = this.props.salesItems;
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

                <li key={index}><Link to="/jf.html/R_det" className="upItem" data-id={goods.item_id}  ><div className="info-img"><div className={sales_top}></div>
      <LazyLoad placeholder={<PlaceholderComponent />}  >
                <img  src={goods.list_image} />
     </LazyLoad>
                </div><div className="info-bar"><div className="pro-title">{goods.goods_name} </div><div className="e-numb"><span className="e-price"><em>{goods.item_price} </em>积分</span></div></div></Link> </li>

            )

        });
        if (!goodsList.length) {
            goodsList = <div>loading...</div>
        }
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