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
        this.pullUpTips = {
            // 上拉状态
            0: '<i class="r-gif"></i>正在加载',
            1: '没有更多数据了 ',
            2: '已经到底了,别址了',
            3: '加载失败',
            4: '',
        };
    };
    renderPage() {
        let CateGoodList = [];
        let CateGoods = this.props.cateGoods;
        if (this.props.cateGoods != '') {
            CateGoodList = CateGoods.map((CateGood, index) => {
                return (
                    <li  key={index}>
                <Link to={'/jf.html/R_det/'+CateGood.item_id}  className="upItem" data-id={CateGood.item_id}>
                <div className="info-img">
                <LazyLoad >
                <img  src={CateGood.list_image}/>
                </LazyLoad>
                </div>
                <div className="info-bar">
                <div className="pro-title">{CateGood.goods_name}</div>
                <div className="e-numb">
                <span className="e-price"><em>{CateGood.item_price}</em>积分</span>
                </div>
                </div>
                </Link>
                 </li>
                )
            }, this)
        } else if (this.props.pageStatus == 0 && this.props.cateGoods == '') {
            CateGoodList = (<div className="none-data"></div>);
        }
        console.log(this.props.pageStatus);
        console.log(this.props.cateGoods);
        return (


            <div className="app-pd-wp">
                <div className="app-pd-list">
                   <ul>
                {CateGoodList}
                   </ul>
                    </div>
              <p ref="PullUp" id="PullUp" dangerouslySetInnerHTML={{__html:this.pullUpTips[this.props.pullUpStatus]}} />
                    <div className = "load-tip" > </div>
                    </div>



        )
    }
    render() {
        return this.renderPage()
    }
}


export default CateGoods;