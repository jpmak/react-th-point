import React from 'react';
import $ from 'jquery';
import {
    Motion,
    spring
} from 'react-motion';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'


// let goodsList = this.state.goodsList;
class JsCate extends React.Component {
    // get_cate_goods(event, page) {
    //     const _this = this;

    //     fetch(urlRoot + '?g=WapSite&c=Exchange&a=get_cate_goods', {
    //             method: 'POST',
    //             headers: {
    //                 "Content-Type": "application/x-www-form-urlencoded"
    //             },
    //             body: 'cate_id=' + event + '&page=' + page
    //         })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             this.setState({
    //                 goodsList: data.goods_list,
    //                 goodsState: data.status
    //             });
    //             let goodsState = this.state.goodsState
    //             if (goodsState) {
    //                 let goodsHtml = this.state.goodsHtml;
    //                 let goodsLists = this.state.goodsList;
    //                 let goodsList = goodsLists.map(function(goods, index) {
    //                     // to="/jf.html/R_det"  to={'/jf.html/R_det/${{goods.item_id}}'} 
    //                     return (
    //                         <li  key={index}> <Link to={'/jf.html/R_det/'+goods.item_id}  className="upItem" data-id={goods.item_id}><div className="info-img"><img alt="" className="lazy" data-original={goods.list_image}/></div><div className="info-bar"><div className="pro-title">{goods.goods_name}</div><div className="e-numb"><span className="e-price"><em>{goods.item_price}</em>积分</span></div></div></Link> </li>

    //                     )

    //                 });

    //                 if (page === 0) {
    //                     this.setState({
    //                         goodsHtml: goodsList
    //                     });
    //                     page_state = 1;

    //                 } else if (page !== 0) {
    //                     goodsHtml.push(goodsList);
    //                     this.setState({
    //                         goodsHtml: goodsHtml
    //                     });
    //                     page_state = 1;
    //                     $('.load-tip').hide();
    //                 }
    //                 // 
    //                 $('.app-pd-list img.lazy').show().lazyload({
    //                     skip_invisible: false,
    //                     effect: 'fadeIn',
    //                     threshold: 0
    //                 });

    //             } else if (goodsState === 0) {
    //                 if (page === 0) {
    //                     this.setState({
    //                         goodsHtml: <div className='none-data' dangerouslySetInnerHTML={{__html: "<div></div>"}} />
    //                     });
    //                     $('.load-tip').hide();
    //                     page_state = 0;

    //                 } else {
    //                     $('.load-tip').show().html('没有更多数据了');
    //                 }
    //             }
    //         })
    //         .catch(function(e) {
    //             console.log("加载失败");
    //         });
    // }



    // getCateList() {
    //     const _this = this;
    //     $.getJSON(urlRoot + '?g=WapSite&c=Exchange&a=get_cate_list',
    //         function(data) {
    //             this.setState({
    //                 loading: false,
    //                 data_p: null,
    //                 cateList: data.cate_list,
    //                 event: data.cate_list[0].cate_id
    //             });
    //             var nav_w = $('.app-scroller li').first().width();
    //             var fl_w = $('.app-scroller').width();
    //             var flb_w = $('.app-scroller-wrap').width();
    //             $('.choose-items-wp p').width(nav_w);
    //             event = this.state.event;
    //             $('.app-scroller li').on('click', function() {
    //                 page = 0;
    //                 event = $(this).attr('id');
    //                 nav_w = $(this).width();
    //                 _this.get_cate_goods(event, page);
    //                 $('.choose-items-wp p').stop(true);
    //                 $('.choose-items-wp p').animate({
    //                     left: $(this).position().left
    //                 }, 300);
    //                 $('.choose-items-wp p').animate({
    //                     width: nav_w
    //                 });
    //                 var fn_w = ($('.app-scroller-wrap').width() - nav_w) / 2;

    //                 var fnl_l;
    //                 var fnl_x = parseInt($(this).position().left);
    //                 $(this).addClass('act').siblings().removeClass('act');
    //                 if (fnl_x <= fn_w) {
    //                     fnl_l = 0;
    //                 }
    //                 $('.app-scroller').animate({
    //                     'left': fnl_l
    //                 }, 300);
    //             });
    //             // _this.get_cate_goods(event, page);
    //         }.bind(_this));
    // }

    // ScrollPage() {
    //     const _this = this;
    //     let winH = $(window).height();
    //     // window.scrollTo(0, 0);
    //     console.log('test');
    //     console.log(winH);

    //     $(window).scroll(function() {
    //         console.log(_this.mounted);

    //         var pageH = $(document.body).height(),
    //             scrollT = $(window).scrollTop(),
    //             rate = (pageH - winH - scrollT) / winH;
    //         console.log(scrollT);

    //         if (page_state === 1) {
    //             if (_this.mounted && rate < 0.01) {
    //                 page++;
    //                 page_state = 0;
    //                 _this.get_cate_goods(event, page);

    //                 $('.load-tip').show().html('<i class="r-gif"></i><span>正在载入</span>');

    //             }
    //         }
    //     });
    //     //滚动加载
    // }
    // goodsState() {
    //     if (page === 0) {
    //         $('.load-tip').hide();
    //         page_state = 0;
    //         return <div className='none-data' dangerouslySetInnerHTML={{__html: "<div></div>"}} />
    //     } else {
    //         $('.load-tip').show().html('没有更多数据了');

    //     }
    // }
    constructor(props) {
        super(props);
        this.state = {
            open: 0
        };
    };
    handleClick() {
        this.setState({
            open: 30
        });
        console.log('test');
        var nav_w = $('.app-scroller li').first().width();
        var fl_w = $('.app-scroller').width();
        var flb_w = $('.app-scroller-wrap').width();
        var left = '';
        // $('.choose-items-wp p').stop(true);
        // $('.choose-items-wp p').css({
        //     'left': '300px'
        // });
        // $('.choose-items-wp p').animate({
        //     left: $(this).position().left
        // }, 300);
        // $('.choose-items-wp p').animate({
        //     width: nav_w
        // });


        // var fn_w = ($('.app-scroller-wrap').width() - nav_w) / 2;

        // var fnl_l;
        // var fnl_x = parseInt($(this).position().left);
        // $(this).addClass('act').siblings().removeClass('act');
        // if (fnl_x <= fn_w) {
        //     fnl_l = 0;
        // }
        // $('.app-scroller').animate({
        //     'left': fnl_l
        // }, 300);
    }


    render() {
        let nav_w = $('.app-scroller li').first().width();
        $('.choose-items-wp p').width(nav_w);

        let CateLists = this.props.cateList;
        let CateList = CateLists.map(function(Cate, index) {
            var act = ""
            switch (index) {
                case 0:
                    act = "act"
                    break;

            }
            //           {
            //     this.state.goodsHtml
            // }
            return (
                <li key={index} className={act} id={Cate.cate_id} onClick={this.handleClick.bind(this)}><a><span>{Cate.cate_name}</span></a></li>
            )
        }, this)
        return (
            <div>
                    <div id="app-scroller" className="app-scroller-wrap" >
                        <div className="app-scroller">
                            <ul className="choose-items-wp">
                            {CateList}
                           <Motion style={{x: spring(this.state.open )}}>
                           {({x}) =>

                                <p style={{
                WebkitTransform: `translate3d(${x}px, 0, 0)`,
                transform: `translate3d(${x}px, 0, 0)`,
              }}
              ><b></b></p>

                                  }
        </Motion>
                       
                            </ul>
                        </div>
                    </div>
 <div className="app-pd-wp">
                <div className="app-pd-list">

                   <ul>
    
       
                   </ul>
                    </div>
                    </div>
                    <div className="load-tip"></div>
                </div>
        )
    }
}
export default JsCate;