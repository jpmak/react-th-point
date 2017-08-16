import React from 'react';
import $ from 'jquery';
import LazyLoad from 'react-lazyload';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'


// let goodsList = this.state.goodsList;
class CateGoods extends React.Component {

    constructor(props) {
        super(props);
        this.touchRange = 0 // 触控距离
        this.touchLeft = 0;
        this.onClick = false;
        this.state = {
            move: 0,
            currentIndex: 0,
            liWidth: 0,
            wrapWidth: 0,
            onStartX: 0,
            onMoveX: 0

        };
    };

    render() {

        let CateGoods = this.props.cateGoods;
        let CateList = CateGoods.map(function(CateGood, index) {
            return (
                <li  key={index}> <Link to={'/jf.html/R_det/'+CateGood.item_id}  className="upItem" data-id={CateGood.item_id}><div className="info-img"><LazyLoad once height={100}><img  src={CateGood.list_image}/></LazyLoad></div><div className="info-bar"><div className="pro-title">{CateGood.goods_name}</div><div className="e-numb"><span className="e-price"><em>{CateGood.item_price}</em>积分</span></div></div></Link> </li>
            )
        }, this)
        return (

            <div className="app-pd-wp">
                <div className="app-pd-list">
                   <ul>
                {CateList}
                   </ul>
                    </div>
                    <div className = "load-tip" > </div>
                    </div>



        )
    }
}
export default CateGoods;