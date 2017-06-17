import React from 'react';
import Banner from '../det/Banner';
let upItem = '';
let p_type = '';
let eventId = '';

// let eventId = '20662';
// let eventId = '21354';
// 
let clickState = 1;
class FixBtn extends React.Component {
    componentDidMount() {
        $('.product-payup').on('click', function() {
            $('.product-cover').addClass('cover-toggle').show();
            $('.cover-mask').addClass('cover-mask-toggle').show();
            $('html').addClass('hidescroll');

        });
    }
    render() {
        return (
            <div className="fix-box product-payup">
            <div className="pay-item">
                <div className="wbox-flex tc">
        <a className="th-btn th-btn-assertive ">{this.props.title}</a>
                </div>
            </div>
        </div>
        )
    }
}

class CoverMask extends React.Component {
    componentDidMount() {
        $('.cover-body').height($('.product-cover').height() - $('.cover-head').height());
        $('.close,.cover-mask').on('click', function() {
            $('.product-cover').removeClass('cover-toggle').hide();
            $('.cover-mask').removeClass('cover-mask-toggle').hide();
            $('html').removeClass('hidescroll');
        });
    }
    render() {
        return (
            <div className="cover-mask"></div>
        )
    }
}

class ProductCover extends React.Component {
    // constructor(props) {
    //         super(props);
    //         this.state = {
    //             getId: eventId
    //         };

    //     }
    // componentDidUpdate() {
    //     let keyText = $('.items').text();

    //     const _this = this;
    //     $('.select-list .items .value').on('click', function() {
    //         $(this).addClass('cur').siblings().removeClass('cur');
    //         eventId = $(this).attr('id');
    //         // _this.handelClick();
    //     });
    //     // $('.select-list .items .value').first().addClass('cur').trigger('click');


    // }
    render() {
        const _this = this;
        let saleProps = this.props.saleProp;
        let itemUrls = this.props.itemUrl;
        /*for in*/
        // let salePropList = saleProps.map(function(saleProp, index) {
        //     let propLis = saleProp.props;
        //     let keysrt = '';
        //     let propNum = 1;
        //     let propClassAdd = '';
        //     console.log(saleProps);
        //     for (var n in propLis) {
        //         if (propLis.hasOwnProperty(n) === true) {
        //             if (propNum == 1) {
        //                 propClassAdd = 'cur disabled';
        //             } else {
        //                 propClassAdd = '';
        //             }
        //             keysrt += '<a class="value ' + propClassAdd + '" key="' + itemUrls[n] + '"  id="' + itemUrls[n] + '">' + propLis[n] + '</a>'

        //         }
        //         propNum++;
        //     }
        //     return (
        //         <li key={ index }>
        // <h2>{saleProp.prop_name}</h2>
        //     <div className="items" dangerouslySetInnerHTML={{__html:keysrt}} />
        //                 </li>
        //     );
        // });
        /*for in*/
        // 
        let salePropList = saleProps.map(function(saleProp, index) {
            let propLis = saleProp.props;
            let keysrt = '';
            let propNum = 1;
            let propClassAdd = 'value';
            let PropKeys = Object.keys(propLis);
            // console.log(PropKeys);
            // console.log(propLis);
            let PropKeyList = PropKeys.map(function(propLi, index) {
                if (index == 0) {
                    return (
                        // <a className="value " key={index} >{propLi.PropKeys} onClick={_this.props.callClick.bind(_this,itemUrls[propLi])} ></a>
                        <a className='value cur disabled' key={index}  id={itemUrls[propLi]}>{propLis[propLi]} </a>
                    );
                } else {
                    return (
                        <a className='value' key={index} id={itemUrls[propLi]}>{propLis[propLi]} </a>
                    );
                }
            }, _this);
            return (
                <li key={ index }>
                <h2>{saleProp.prop_name}</h2>
                    <div className="items">
        {PropKeyList}
                    </div>
                                </li>
            );
        });
        return (
            <section className="product-cover">
            <div className="wbox-flex">
                <div className="product-icon cover-close">
                    <a className="close"></a>
                </div>
                <div className="cover-head wbox">
                    <div className="img-box "><img src={this.props.imgsrc} alt=""/></div>
                    <div className="product wbox-flex">
                        <p className="num">¥<em>{this.props.item_price}</em><span>积分</span></p>
                        <p className="remaining">剩余库存: <em id="stock">{this.props.stock}</em></p>
                        <p className="select">{this.props.item_name}</p>
                    </div>
                </div>

        <div className="cover-body wbox-flex" style={{'display':this.props.isDisplay}}>
                    <ul className="select-list">
        {
            salePropList
        }
                    </ul>
                </div>
             
        <div style={{color:'#ccc',textAlign:'center','display':!this.props.isDisplay}}>无可选属性</div>
          <PutBtn/>
       
            </div>
        </section>
        )
    }
}
class PutBtn extends React.Component {
    componentDidMount() {
        $(".exchange-submit").click(function() {
            if (!confirm('是否确认兑换')) {
                return false;
            }
            var stock = $("#stock").html();
            if (stock == '缺货' || stock == '') {
                layer.msg('没库存了', {
                    skin: 'layui-layer-huise'
                });
                return false;
            }
            upItem = eventId;
            p_type = $(".product-pay-way .way-wp li.cur").attr('data-id');
            fetch('http://dev.thgo8.com/?g=WapSite&c=Exchange&a=commit_exchange', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },

                    body: 'item_id=' + upItem + '&p_type=' + p_type



                })
                .then((res) => res.json())
                .then((data) => {
                    if (data.ok) {
                        location = 'Exchange-getOrderInfo-' + upItem + '.html';
                    } else {
                        if (data.url != '') {
                            layer.msg('请先登录', {
                                skin: 'layui-layer-huise'
                            });
                            // alert(data.msg);
                            setTimeout(function() {
                                // location = data.url
                            }, 1500);
                        }
                    }
                })
                // .then((data) => {
                //         if (data.ok) {
                //             console.log('test');

            //         } else {

            //             if (data.url != '') {
            //                 console.log(data.url);
            //                 setTimeout(function() {
            //                     location = data.url
            //                 }, 1500);
            //             }
            //         }
            //         // location = 'Exchange-getOrderInfo-' + upItem + '.html';
            //     })
            .catch(function(e) {
                console.log("加载失败");
            });

        });


    }
    render() {
        return (
            <div className="fix-box product-payup">
                    <div className="pay-item">
                        <div className="wbox-flex tc exchange-submit">
                            <a className="th-btn th-btn-assertive ">确定</a>
                        </div>
                    </div>
                </div>
        )

    }
}
class Scrollup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mess: '',
            body: ''
        };

    }
    get_goods_mess() {
        fetch('http://dev.thgo8.com/?g=WapSite&c=Exchange&a=get_goods_mess', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'id=' + this.props.goods_id

            })
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    mess: data.mess
                })
                $('.scroll-up').hide();


                $('img.lazy').lazyload({
                    effect: 'fadeIn'

                });

            })
            .catch(function(e) {
                console.log("加载失败");
            });

    }
    componentDidMount() {
        const _this = this;
        let mess_state = 1;
        let gBody = this.props.goods_body
        var winH = $(window).height();
        $(window).scroll(function() {
            var pageH = $(document.body).height();
            var scrollT = $(window).scrollTop();
            var rate = (pageH - winH - scrollT) / winH;
            if (mess_state == 1) {
                if (rate < 0.01) {
                    $('.scroll-up').hide();
                    mess_state = 0;
                    let pbt = $('.post-body').text();
                    $('.post-body').show().html(pbt);
                }
            }
        });
    }
    render() {
        return (
            <div>
                
            <div className="scroll-up">下拉查看图文详情</div>
        <div className="post-body" style={{display: 'none'}}>{this.props.goods_body}</div>

            </div>


        )
    }
}
class DetBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // getId: eventId,
            saleProp: [],
            prop_name: '',
            itemUrl: '',
            imgsrc: [],
            item_price: '',
            name: '',
            stock: true,
            goods_id: '',
            goods_body: '',
            item_name: '',
            isDisplay: true
        };

    }
    stopPropagation(e) {
        e.stopPropagation();
    }

    handleClick() {
        fetch("http://dev.thgo8.com/?g=WapSite&c=Exchange&a=get_goods_msg", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'id=' + eventId
            })
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    prop_name: (json.prop_name) ? json.prop_name : '',
                    saleProp: (json.saleProp) ? json.saleProp : [],
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
                var swiper = new Swiper('.big_img_wrapper', {
                    pagination: '.big-img-pagination',
                    paginationClickable: true,
                    centeredSlides: true,
                    lazyLoading: true, // 滚动加载
                    spaceBetween: -20,
                    slidesPerView: 1.34
                        // loop: true,
                });
            })
            .catch(function(e) {
                console.log("加载失败");
            });
        this.stopPropagation();
    }
    getUpItem() {
        if (window.localStorage.upItem) {
            eventId = window.localStorage.upItem;
            this.handleClick();
            // arrval.push(searchMsg);
        } else {
            alert('网络异常')
        }
    }
    componentDidMount() {
        this.getUpItem();

    }


    componentDidUpdate() {
        const _this = this
        $('.way-wp li').on('click', function() {
            $(this).addClass('cur').siblings().removeClass('cur');
            p_type = $(this).attr('data-id');
            console.log(p_type);

        });
        $('.select-list .items .value').on('click', function() {
            $(this).addClass('cur disabled').siblings().removeClass('cur disabled');
            eventId = $(this).attr('id');
            upItem = eventId;
            // console.log(upItem);
            _this.handleClick();
        });


    }

    render() {
        var isDisplay = this.state.isDisplay ? 'block' : 'none';
        return (

            <div className="produt-show">
        <Banner imgsrc={this.state.imgsrc}/>
            <div className="w">
            <div className="product-main">
            <div className="product-price">
            <span className="num"><em>{this.state.item_price}</em></span><span className="unit">积分</span>
            </div>
            <div className="product-tit">
            <h1>{this.state.name}</h1>
            </div>
            <div className="product-pay-way">
            <p className="statement">选择你要使用的积分类型</p>
            <ul className="way-wp wbox">
            <li data-id="balance_point" className="cur"><i className="round"></i><span>排点积分</span></li>
            <li data-id="travel_point"><i className="round" ></i><span>旅游积分</span></li>
            <li  data-id="point"><i className="round" ></i><span>购物积分</span></li>
            </ul>
            </div>
            <div className="product-count">
        <p className="remaining">剩余库存:<em>{this.state.stock? this.state.stock : '缺货'}</em></p>
            <p className="courier">服务由<span className="name">通惠</span>发货并提供售后服务</p>
            </div>
          <Scrollup goods_body={this.state.goods_body}/>
            </div>
            </div>
            <CoverMask/>
        <ProductCover isDisplay={isDisplay}  callClick={this.handleClick} imgsrc={this.state.imgsrc[0]} item_price={this.state.item_price} stock={this.state.stock? this.state.stock : '缺货'} item_name={this.state.item_name} prop_name={this.state.prop_name} saleProp={this.state.saleProp} itemUrl={this.state.itemUrl} />
        <FixBtn title = "立即兑换"/>

            </div>
        )

        ap
    }
}
export default DetBody;