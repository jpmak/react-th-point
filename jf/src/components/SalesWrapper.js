import React from 'react';
import $ from 'jquery';

import Loading from './public/Loading';
import {
    Link
} from 'react-router-dom'

class SalesWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.touchRange = 0 // 触控距离
        this.touchLeft = 0;
        this.state = {
            wrapWidth: 0,
        };
    };

    startMoveImg(e) {
        this.touchRange = e.touches[0].pageX;
        this.touchLeft = this.state.wrapWidth
    }
    movingImg(e) {
        let moving = e.touches[0].pageX;

        let addWidth = $('.jf-bsell-box .list').width();
        let screenWidth = $('#sales-wrapper').width();
        if (screenWidth <= addWidth) {
            if (this.touchLeft + moving - this.touchRange >= 0) {
                this.setState({
                    wrapWidth: 0
                })
            } else if (this.touchLeft + moving - this.touchRange <= screenWidth - addWidth) {
                this.setState({
                    wrapWidth: -(addWidth - screenWidth)
                })

            } else {
                this.setState({
                    wrapWidth: this.touchLeft + moving - this.touchRange
                })
            }
        }
    }
    handleClick(goods_name, item_price, list_image) {
        this.props.detailData(goods_name, item_price, list_image)
    }
    render() {
        const _this = this;

        let goodsHtmls = this.props.salesItems;

        let goodsList = goodsHtmls.map(function(goods, index) {
            var sales_top = ' '
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
                default:
                    sales_top = 'top';
            }
            return (

                <li  key={index} onClick={_this.handleClick.bind(_this,goods.goods_name,goods.item_price,goods.list_image)}><Link to={'/product/'+goods.item_id} className="upItem" data-id={goods.item_id}  ><div className="info-img"><div className={sales_top}></div>
                <img alt='' src={goods.list_image}  />
                </div><div className="info-bar"><div className="e-numb"><span className="e-price"><em>{goods.item_price} </em>积分</span></div></div></Link> </li>


            )

        });

        // <Motion style={{navw:spring(this.state.wrapWidth)}}>{({navw}) =>
        // <div id="sales-wrapper" onTouchStart={this.startMoveImg.bind(this)}  onTouchMove={this.movingImg.bind(this)}>
        //  <div className='hor-view'>
        //  <div className='tag'>热门推荐</div>
        // </div>
        //<div id='scroller'>
        //  <div className="list" style={{WebkitTransform: `translate3d(${navw}px, 0, 0)`,transform: `translate3d(${navw}px, 0, 0)`}} >
        //     <ul>{goodsList}</ul>

        //  </div>
        //  </div>
        //  </div>
        //  }
        //  </Motion>
        if (!goodsList.length) {

            goodsList = <div><Loading/></div>
        }

        return (

            <div id="sales-wrapper" >
            <div className='hor-view'>
<div className='tag'>热门推荐</div>
            </div>
        <div id='scroller'>
                <div className="list">
                        <ul>{goodsList}</ul>
                  
</div>
</div>
</div>



        );

    }
}


export default SalesWrapper;