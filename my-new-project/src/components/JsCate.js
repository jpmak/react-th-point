import React from 'react';
import {
    BrowserRouter as Router,

    Route,
    Link
} from 'react-router-dom'

let event = '';
let page = '';
let page_state = 1;

// class JsPrduct extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             goodsList: [],
//             goodsHtml: []
//         };
//     }
//     componentDidMount() {
//         //滚动加载
//         this.ScrollPage();

//     }
//     ScrollPage() {
//         var winH = $(window).height(),
//             page = 0;
//         const _this = this;

//         $(window).scroll(function() {
//             var pageH = $(document.body).height(),
//                 scrollT = $(window).scrollTop(),
//                 page_state = 1,
//                 rate = (pageH - winH - scrollT) / winH;
//             if (page_state == 1) {
//                 if (rate < 0.01) {
//                     page++;
//                     console.log(page_state);
//                     page_state = 0;
//                     // $('.app-pd-list ul').append(goodsList);
//                     _this.get_cate_goods(6, 0);
//                     // console.log(goodsHtml);

//                     $('.load-tip').show().html('<i class="r-gif"></i><span>正在载入</span>');

//                 }
//             }
//         });
//         //滚动加载
//     }
//     funStoreUpItem(upItem) {
//         window.localStorage.upItem = upItem;
//     }
//     CleanState() {
//         this.setState({
//             goodsHtml: []
//         });
//     }
//     componentDidUpdate() {
//         const _this = this;

//         $('a.upItem').on('click', function() {
//             let upItem = $(this).attr('data-id');
//             _this.funStoreUpItem(upItem);
//         });
//     }

//     get_cate_goods(event, page, page_state) {
//         fetch('http://dev.thgo8.com/?g=WapSite&c=Exchange&a=get_cate_goods', {
//                 method: 'POST',
//                 headers: {
//                     "Content-Type": "application/x-www-form-urlencoded"
//                 },
//                 body: 'cate_id=' + this.props.event + '&page=' + page
//             })
//             .then((res) => res.json())
//             .then((data) => {
//                 this.setState({
//                     goodsList: data.goods_list
//                 })


//                 if (data.status) {

//                 } else {
//                     if (page == 0) {
//                         var liHtml = '';
//                         liHtml += '<div class="none-data"></div>';
//                         // $('.app-pd-list ul').html(liHtml);
//                         $('.load-tip').hide();
//                         page_state = 0;
//                     } else {
//                         $('.load-tip').show().html('没有更多数据了');

//                     }
//                 }

//                 $('.app-pd-list img.lazy').show().lazyload({
//                     skip_invisible: false,
//                     effect: 'fadeIn',
//                     threshold: 0
//                 });

//             })
//             .catch(function(e) {
//                 console.log("加载失败");
//             });


//     }
//     render() {
//         //对应列表信息
//         //
//         let goodsLists = this.state.goodsList;
//         let goodsHtml = this.state.goodsHtml;

//         let goodsList = goodsLists.map(function(goods, index) {

//             return (
//                 <li  key={index}> <Link to="/jf.html/R_det" className="upItem" data-id={goods.item_id}><div className="info-img"><img alt="" className="lazy" data-original={goods.list_image}/></div><div className="info-bar"><div className="pro-title">{goods.goods_name}</div><div className="e-numb"><span className="e-price"><em>{goods.item_price}</em>积分</span></div></div></Link> </li>
//             )

//         });
//         // goodsHtml = goodsHtml.caoncat(goodsList);
//         goodsHtml.push(goodsList);
//         console.log(goodsHtml);


//         // this.setState({
//         //     goodsHtml: goodsHtml
//         // });
//         // 
//         // goodsLists.forEach(function(goods, index) {
//         //     goodsHtml.push(<li  key={index}> <Link to="/jf.html/R_det" className="upItem" data-id={goods.item_id}><div className="info-img"><img alt="" className="lazy" data-original={goods.list_image}/></div><div className="info-bar"><div className="pro-title">{goods.goods_name}</div><div className="e-numb"><span className="e-price"><em>{goods.item_price}</em>积分</span></div></div></Link> </li>);
//         // })


//         return (
//             <div>
//             <div className="app-pd-wp">
//                 <div className="app-pd-list">
//                    <ul>
//            {goodsHtml}
//                    </ul>
//                     </div>
//                     </div>
//                     <div className="load-tip"></div>
//                     </div>
//         )
//     }
// }

class JsCate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cateList: [],
            goodsList: [],
            goodsHtml: [],
            changeState: 1,
            page: 0,
            event: '',
            goodsListStar: ''


        };

    }

    get_cate_goods(event, page) {
        fetch('http://dev.thgo8.com/?g=WapSite&c=Exchange&a=get_cate_goods', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'cate_id=' + event + '&page=' + page
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    this.setState({
                        goodsList: data.goods_list
                    })
                    let changeState = this.state.changeState;
                    let goodsLists = this.state.goodsList;
                    let goodsHtml = this.state.goodsHtml;
                    // let page = this.state.page;
                    let liHtml = (function() {
                        return (
                            <div className="none-data"></div>
                        )
                    });
                    let goodsList = goodsLists.map(function(goods, index) {
                        return (
                            <li  key={index}> <Link to="/jf.html/R_det" className="upItem" data-id={goods.item_id}><div className="info-img"><img alt="" className="lazy" data-original={goods.list_image}/></div><div className="info-bar"><div className="pro-title">{goods.goods_name}</div><div className="e-numb"><span className="e-price"><em>{goods.item_price}</em>积分</span></div></div></Link> </li>
                        )

                    });
                    goodsHtml.push(goodsList)
                        // console.log(goodsLists);
                    if (page === 0) {
                        this.setState({
                            goodsHtml: goodsList
                        })
                    } else {
                        this.setState({
                            goodsHtml: goodsHtml
                        })
                        page_state = 1;
                        $('.load-tip').hide();
                    }
                    $('.app-pd-list img.lazy').show().lazyload({
                        skip_invisible: false,
                        effect: 'fadeIn',
                        threshold: 0
                    });
                } else if (data.status === 0) {
                    console.log(event);
                    console.log(page);
                    if (page === 0) {
                        var liHtml = '';
                        liHtml += '<div class="none-data"></div>';
                        $('.app-pd-list ul').html(liHtml);
                        console.log(111);
                        $('.load-tip').hide();
                        page_state = 0;
                    } else {
                        $('.load-tip').show().html('没有更多数据了');

                    }
                }
            })
            .catch(function(e) {
                console.log("加载失败");
            });


        //

    }

    getCateList() {
        const _this = this;
        $.getJSON('http://dev.thgo8.com/?g=WapSite&c=Exchange&a=get_cate_list',
            function(data) {
                this.setState({
                    loading: false,
                    data_p: null,
                    cateList: data.cate_list,
                    event: data.cate_list[0].cate_id
                });
                var nav_w = $('.app-scroller li').first().width();
                var fl_w = $('.app-scroller').width();
                var flb_w = $('.app-scroller-wrap').width();
                $('.choose-items-wp p').width(nav_w);
                event = this.state.event;


                // page = this.state.page,
                // changeState = this.state.changeState;
                $('.app-scroller li').on('click', function() {
                    page = 0;

                    event = $(this).attr('id');
                    nav_w = $(this).width();


                    _this.get_cate_goods(event, page);
                    $('.choose-items-wp p').stop(true);
                    $('.choose-items-wp p').animate({
                        left: $(this).position().left
                    }, 300);
                    $('.choose-items-wp p').animate({
                        width: nav_w
                    });
                    var fn_w = ($('.app-scroller-wrap').width() - nav_w) / 2;

                    var fnl_l;
                    var fnl_x = parseInt($(this).position().left);
                    $(this).addClass('act').siblings().removeClass('act');
                    if (fnl_x <= fn_w) {
                        fnl_l = 0;
                    }
                    $('.app-scroller').animate({
                        'left': fnl_l
                    }, 300);
                });
                _this.get_cate_goods(event, page);
            }.bind(_this));
    }

    componentDidMount() {
        this.getCateList();
        this.ScrollPage();

    }

    ScrollPage() {
        const _this = this;
        let winH = $(window).height();
        let changeState = this.state.changeState;


        // let page = this.state.page;
        // console.log(t);
        console.log(event);
        $(window).scroll(function() {
            var pageH = $(document.body).height(),
                scrollT = $(window).scrollTop(),

                rate = (pageH - winH - scrollT) / winH;
            if (page_state === 1) {
                console.log(page_state);
                if (rate < 0.01) {
                    console.log(event);
                    page++;
                    page_state = 0;
                    _this.get_cate_goods(event, page);
                    // _this.get_cate_goods(20, page);
                    $('.load-tip').show().html('<i class="r-gif"></i><span>正在载入</span>');

                }
            }
        });
        //滚动加载
    }
    handelClick() {
        // this.setState({
        //     goodsHtml: []
        // });

        this.setState({
            changeState: 2
        });

    }
    render() {

        // goodsHtml.push(goodsList);

        // goodsHtml = goodsList;

        // this.setState({
        //     goodsHtml: goodsHtml
        // })
        // console.log('test');
        // console.log(goodsHtml);
        //列表
        let CateLists = this.state.cateList;
        let CateList = CateLists.map(function(Cate, index) {
            return (
                <li key={index} id={Cate.cate_id} ><a><span>{Cate.cate_name}</span></a></li>
            )
        }, this)
        return (
            <div>
                    <div id="app-scroller" className="app-scroller-wrap" style={{'height': '.75rem'}}>
                        <div className="app-scroller">
                            <ul className="choose-items-wp">
                            {CateList}
                                <p style={{'top':'.7rem'}}><b></b></p>
                       
                            </ul>
                        </div>
                    </div>
 <div className="app-pd-wp">
                <div className="app-pd-list">
                   <ul>
           {this.state.goodsHtml}
                   </ul>
                    </div>
                    </div>

                {/*
        <JsPrduct ref="JsPrduct" event={this.state.goodsList_0}/>
                */}
               
                    <div className="load-tip"></div>
     
                </div>

        )


    }
}
export default JsCate;