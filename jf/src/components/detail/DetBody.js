import React from 'react';
import $ from 'jquery';
import Banner from './Banner';
import FixBtn from './FixBtn';
import BottomTipFloor from './BottomTipFloor';
import ProductCover from './ProductCover';
import CoverMask from './CoverMask';
import Scrollup from './Scrollup';
import PayWay from './PayWay';



class DetBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            saleProp: [],
            prop_name: '',
            itemUrl: '',
            imgsrc: [],
            item_price: '',
            name: '',
            stock: false,
            goods_id: '',
            goods_body: '',
            item_name: '',
            isDisplay: true,
            isPushUp: 'none',
            iScrollUp: true


        };
        this.detailMsg = '';
        this.touchRange = 0; // 触控距离;
        this.moving = 0;
    }
    stopPropagation(e) {
        e.stopPropagation();
    }

    handleClick() {
            fetch('/wap/?g=WapSite&c=Exchange&a=get_goods_msg', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: 'id=' + this.props.paramsId

                })
                .then((res) => res.json())
                .then((json) => {
                    this.setState({
                        prop_name: (json.prop_name) ? json.prop_name : '',
                        // saleProp: (json.saleProp) ? json.saleProp : [],

                        saleProp: json.saleProp,
                        itemUrl: (json.itemUrl) ? json.itemUrl : '',
                        item_price: json.goods.item_price,
                        name: json.goods.goods_name,
                        stock: json.goods.stock,
                        goods_id: json.goods.goods_id,
                        goods_body: json.goods.goods_body,
                        imgsrc: json.goods.main_image,
                        item_name: (json.goods.item_name) ? '已选择：' + json.goods.item_name : ''
                    });

                    if (!json.saleProp) {
                        this.setState({
                            isDisplay: false
                        });
                    }

                })
                .catch(function(e) {
                    console.log("加载失败");
                });
        }
        // getUpItem() {
        //     if (window.localStorage.upItem) {
        //         eventId = window.localStorage.upItem;
        //         this.handleClick();
        //     } else {
        //         alert('网络异常')
        //     }
        // }
    componentWillMount() {
        if (window.localStorage.detailData) {
            this.detailMsg = JSON.parse(window.localStorage.detailData);
            this.setState({
                name: this.detailMsg.productName,
                item_price: this.detailMsg.productPrice,
                imgsrc: this.detailMsg.productImg
            });
        }
        console.log(this.detailMsg.productImg);

        this.handleClick();

        window.scrollTo(0, 0);

    }
    componentDidMount() {
        console.log(this.detailMsg);
        $("body").unbind("touchmove");
    }

    componentDidUpdate() {
        const _this = this
        $('.way-wp li').on('click', function() {
            $(this).addClass('cur').siblings().removeClass('cur');
        });
        $('.select-list .items .value').on('click', function() {
            $(this).addClass('cur disabled').siblings().removeClass('cur disabled');
            // eventId = $(this).attr('id');
            _this.handleClick();
        });
    }
    iScrollUp() {
        this.setState({
            iScrollUp: !this.state.iScrollUp
        })
    }

    startMove(e) {
        this.touchRange = e.touches[0].pageY;

    }
    movIng(e) {
        this.moving = e.touches[0].pageY
    }
    endMove() {
        if (this.touchRange - this.moving > 20 && this.state.iScrollUp && this.moving !== 0) {
            let num = this.touchRange - this.moving;
            console.log('Range= ' + this.touchRange);
            console.log('moving= ' + this.moving);
            console.log(num);
            this.iScrollUp();

            this.refs.Scrollup.changeBlock()
        }
    }
    render() {
        console.log(this.state.iScrollUp);
        var isDisplay = this.state.isDisplay ? 'block' : 'none';
        return (
            <div>
            <div className="produt-show" style={{position:'relative'}} onTouchStart={this.startMove.bind(this)} onTouchMove={this.movIng.bind(this)}  onTouchEnd={this.endMove.bind(this)}>
     
            <div className="w">
        <Banner imgsrc={this.state.imgsrc}/>

            <div className="product-main">
    
            <div className="product-tit">
            <h1>{this.state.name}</h1>
        <div className='tip'>产品不设退换</div>
                <div className="product-price">
            <span className="num"><em>{this.state.item_price}</em></span><span className="unit">积分</span>
            </div>
            </div>

            <div className="product-count">
        <p className="remaining">剩余库存:<em>{this.state.stock? this.state.stock : '缺货'}</em></p>
            </div>
  
            </div>
            </div>
               <FixBtn title = "立即兑换" stock={this.state.stock} iScrollUp={this.iScrollUp.bind(this)}/>
           
            <BottomTipFloor/>
                  
        <Scrollup ref='Scrollup'  goods_body={this.state.goods_body} iScrollUp={this.iScrollUp.bind(this)}/>
            </div>
                <PayWay/>
            <CoverMask />

        <ProductCover isDisplay={isDisplay}  callClick={this.handleClick} imgsrc={this.state.imgsrc[0]} item_price={this.state.item_price} stock={this.state.stock? this.state.stock : '缺货'} item_name={this.state.item_name} prop_name={this.state.prop_name} saleProp={this.state.saleProp} itemUrl={this.state.itemUrl} />
            </div>
        )


    }
}
export default DetBody;