import React from 'react';
require('styles/iscroll.css');
import iScroll from 'iscroll/build/iscroll-probe'

import $ from 'jquery';
import {
    connect
} from 'react-redux'
import {
    fetchPostsIfNeeded
} from 'actions/search'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import LoadingLayer from '../LoadingLayer/LoadingLayer';
// import loadingImg from '../LoadingLayer/loading.svg';
class ResultWrap extends React.Component {
        constructor(props, context) {
            super(props, context);
            this.state = {
                // pullDownStatus: 3,
                // pullUpStatus: 5,
                // pageStatus: 1,
                // goodsHtml: [],
                // goodsList: [],
                opacity: true,
                rs_once: '',
                ScrollVal: ''
            };
            this.p = 0;
            this.t = 0;
            this.page = 0;



            this.itemsChanged = false;

            this.pullDownTips = {
                // 下拉状态
                0: '下拉发起刷新',
                1: '继续下拉刷新',
                2: '松手即可刷新',
                3: '<i class="r-gif"></i>正在刷新',
                4: '刷新成功',
                5: '刷新失败',
                6: ''
            };

            this.pullUpTips = {
                // 上拉状态
                0: '上拉发起加载',
                1: '松手即可加载',
                2: '<i class="r-gif"></i>正在加载',
                3: '加载成功',
                4: '没有更多数据',
                5: '刷新失败',
                6: ''


            };
            this.isToUp = true;
            this.isToDown = true
            this.isTouching = false;
            // this.onItemClicked = this.onItemClicked.bind(this);
            this.onScroll = this.onScroll.bind(this);
            this.onScrollEnd = this.onScrollEnd.bind(this);
            this.onTouchStart = this.onTouchStart.bind(this);
            this.onTouchEnd = this.onTouchEnd.bind(this);
        }

        PreventDefault(e) {
            e.preventDefault();
        }
        componentWillReceiveProps(nextProps) {


            // if (nextProps.status !== this.props.status && nextProps.status !== undefined) {
            //     console.log('test');
            //     if (this.state.pullDownStatus == 3) {
            //         this.setState({
            //             pullDownStatus: 4
            //                 // page_state: 1,

            //         });

            //         this.iScrollInstance.scrollTo(0, -1 * $(this.refs.PullDown).height(), 500);
            //         // if (this.state.pullUpStatus == 5) {
            //         //     this.setState({
            //         //         pullUpStatus: 0, //
            //         //         opacity: false
            //         //     });
            //         // }
            //     }

            // }

        }
        componentDidMount() {
            // 首次进入列表页，那么异步加载数据
            if (this.props.loadingStatus == 1) {
                this.props.beginRefresh();
            } else {
                this.ensureIScrollInstalled();
                // 非首次进入，那么恢复滚动条的位置 (如果离开页面时处于下拉位置, 那么进行修正)
                let y = this.props.y;
                if (y > -1 * $(this.refs.PullDown).height()) {
                    y = -1 * $(this.refs.PullDown).height();
                }
                this.iScrollInstance.scrollTo(0, y);
            }
            // this.props.fetchPostsIfNeeded();


            // if (this.props.status == 1) {

            // }
            // this.fetch(true);
            const _this = this;

            let rs_once = parseInt($('.result-sort').css('top'))
            this.setState({
                rs_once: rs_once
            });
            document.addEventListener('touchmove', this.PreventDefault, false);
            // document.addEventListener('scroll', this.PreventDefault, false);

            $('.result-sort li').not('.icons-list').on('click', function() {
                var liindex = $('.result-sort li').index(this);
                $(this).addClass('cur').siblings().removeClass('cur');
                if (liindex == 0) {
                    price = '';

                }
                if (liindex == 1) {
                    price = 'desc';

                }
                if (liindex == 2) {
                    if ($('.result-sort li.arrow').hasClass('asc') || price == 'asc') {
                        $('.result-sort li.arrow').removeClass('asc').addClass('desc');
                        price = 'desc';
                    } else {
                        $('.result-sort li.arrow').removeClass('desc').addClass('asc');
                        price = 'asc';
                    }
                }
                // _this.sendAjax();
            });

            $('.result-sort li.icons-list').on('click', function() {
                _this.iScrollInstance.refresh();
                if ($('.result-sort li.icons-list').hasClass('ver-icon')) {
                    $('.result-sort li.icons-list').removeClass('ver-icon');
                    $('.result-sort li.icons-list').addClass('hor-icon');
                } else {
                    $('.result-sort li.icons-list').addClass('ver-icon');
                    $('.result-sort li.icons-list').removeClass('hor-icon');
                }
                if ($('.app-pd-list').hasClass('hor-list')) {
                    $('.app-pd-list').removeClass('hor-list');
                } else {
                    $('.app-pd-list').addClass('hor-list');
                }
            });


        }
        funStoreUpItem(upItem) {
            window.localStorage.upItem = upItem;
        }


        /**
         * 加载完成后初始化一次iscroll
         */
        ensureIScrollInstalled() {
            if (this.iScrollInstance) {

                return this.iScrollInstance;

            }
            const options = {
                // 默认iscroll会拦截元素的默认事件处理函数，我们需要响应onClick，因此要配置
                preventDefault: false,
                // 禁止缩放
                zoom: false,
                // 支持鼠标事件，因为我开发是PC鼠标模拟的
                mouseWheel: true,
                // 滚动事件的探测灵敏度，1-3，越高越灵敏，兼容性越好，性能越差
                probeType: 3,
                // 拖拽超过上下界后出现弹射动画效果，用于实现下拉/上拉刷新
                bounce: true,
                // 展示滚动条
                scrollbars: true,
            };
            this.iScrollInstance = new iScroll('#ListOutsite', options);
            this.iScrollInstance.on('scroll', this.onScroll);
            this.iScrollInstance.on('scrollEnd', this.onScrollEnd);
            this.iScrollInstance.refresh();
            return this.iScrollInstance;
        }

        onTouchStart(ev) {
            this.isTouching = true;
            this.onTouch = true;
        }


        onTouchEnd(ev) {
            this.isTouching = false;
            this.onTouch = false;


        }

        onPullDown() {
            // 手势
            if (this.isTouching) {
                if (this.iScrollInstance.y > 5) {

                    this.props.updatePullDownStatus(2);
                } else {
                    this.props.updatePullDownStatus(1);
                }
            }
        }

        onPullUp() {
            // 手势
            if (this.isTouching) {
                if (this.iScrollInstance.y <= this.iScrollInstance.maxScrollY - 5) {
                    this.props.pullUpStatus != 1 && this.props.updatePullUpStatus(1);
                } else {
                    this.props.updatePullUpStatus(0);
                }
            }
        }

        onScroll() {
            const _this = this;
            console.log(this.iScrollInstance.y);


            const rs_once = this.state.rs_once;
            let isy = this.iScrollInstance.y;
            if (this.onTouch) {
                this.setState({
                    ScrollVal: isy
                });
            }
            let pullDown = $(this.refs.PullDown);
            // 上拉区域
            if (this.iScrollInstance.y > -1 * pullDown.height()) {
                this.onPullDown();

            } else {
                this.props.updatePullDownStatus(0);
            }
            console.log(this.isToDown);
            //顶部导航收缩
            if (this.t < this.iScrollInstance.y && this.isToUp) {
                this.isToDown = true;
                this.isToUp = false;

                console.log('上上');
                $('.result-sort').stop().animate({
                    top: rs_once + 'px'
                }, 200, function() {
                    this.onTouch = false;
                });
                $('.th-search-container').stop().animate({
                    top: 0 + 'px'
                }, 200);
                //向上
            } else if (this.t > this.iScrollInstance.y && this.isToDown && this.iScrollInstance.y <= -200) {
                this.isToDown = false;
                this.isToUp = true;

                console.log('下下');
                $('.result-sort').stop().animate({
                    top: $('.result-sort').height() - rs_once + 'px'
                }, 200);
                $('.th-search-container').stop().animate({
                    top: -rs_once + 'px'
                }, 200);


                //向下

            }
            setTimeout(function() {
                _this.t = _this.iScrollInstance.y;
            }, 0);
            //顶部导航收缩


            // 下拉区域
            if (this.props.pullUpStatus != 4)
                if (this.iScrollInstance.y <= this.iScrollInstance.maxScrollY + 5) {
                    this.onPullUp();
                } else {
                    this.props.updatePullUpStatus(0);
                }



                // 下拉区域
            if (this.iScrollInstance.y <= this.iScrollInstance.maxScrollY + 5 && this.props.pageStatus != 0) {
                this.onPullUp();
            }
        }
        onRefresh() {
            () => {
                this.iScrollInstance.refresh()
            }
        }
        onScrollEnd() {

            const _this = this;
            let pullDown = $(this.refs.PullDown);

            // 滑动结束后，停在刷新区域
            if (this.iScrollInstance.y > -1 * pullDown.height()) {
                if (this.props.pullDownStatus <= 1) { // 没有发起刷新,那么弹回去
                    this.iScrollInstance.scrollTo(0, -1 * $(this.refs.PullDown).height(), 200);
                    // this.setState({
                    //     opacity: true
                    // })
                } else if (this.props.pullDownStatus == 2) {

                    // 发起了刷新,
                    // 那么更新状态
                    this.props.beginRefresh();
                    // 发起了刷新,那么更新状态
                    // this.setState({
                    //     pullDownStatus: 3,
                    //     pageStatus: 1,
                    //     opacity: false
                    // });

                    // _this.props.pageChange();
                    // dispatch(fetchPostsIfNeeded(searchPagedReddit))
                    // this.fetch(true);
                }
            }
            // 滑动结束后，停在加载区域
            if (this.iScrollInstance.y <= this.iScrollInstance.maxScrollY) {
                if (this.props.pullUpStatus == 1 && this.props.pageStatus == 1) {

                    // if (this.props.pullUpStatus == 1) {
                    // 发起了加载， 那么更新状态
                    this.props.beginLoad();
                }
            }
        }
        shouldComponentUpdate(nextProps, nextState) {
            // 列表对象变化，或者内容变化
            this.itemsChanged = nextProps.items !== this.props.items;
            // this.isToDown = nextState.ScrollVal <= this.state.ScrollVal;
            // this.isToUp = nextState.ScrollVal > this.state.ScrollVal;
            return true;
        }

        // shouldComponentUpdate(nextProps, nextState) {
        //     // 列表发生了变化, 那么应该在componentDidUpdate时调用iscroll进行refresh
        //     this.itemsChanged = nextState.items !== this.state.items;
        //     this.isToDown = nextState.ScrollVal <= this.state.ScrollVal;
        //     this.isToUp = nextState.ScrollVal > this.state.ScrollVal;
        //     return true;
        // }

        componentDidUpdate() {
            const _this = this;
            // 加载屏结束,才可以初始化iscroll
            $('.result-sort li.icons-list').on('click', function() {
                _this.iScrollInstance.refresh();
            });
            if (this.props.loadingStatus == 2) {

                this.ensureIScrollInstalled();
                // 
                // 当列表发生了变更 ，才调用iscroll的refresh重新计算滚动条信息
                if (this.itemsChanged) {
                    this.iScrollInstance.refresh();
                    // 此前是刷新操作，需要回弹
                    if (this.props.pullDownStatus == 4 || this.props.pullDownStatus == 5) {
                        this.iScrollInstance.scrollTo(0, -1 * $(this.refs.PullDown).height(), 500);
                    }
                }
            }
            return true;
            // document.addEventListener('touchmove', function(e) {
            //     e.preventDefault();
            // }, false);
            $('.result-sort li.icons-list').on('click', function() {
                _this.iScrollInstance.refresh();
            });
            // if (this.state.pullDownStatus == 4) {
            //     this.setState({
            //         pullDownStatus: 5

            //     });
            // }
            // 仅当列表发生了变更，才调用iscroll的refresh重新计算滚动条信息
            // if (this.itemsChanged) {
            //     this.iScrollInstance.refresh();
            // }
            return true;
        }

        componentWillUnmount() {
                // document.removeEventListener('scroll', this.PreventDefault, false);

                document.removeEventListener('touchmove', this.PreventDefault, false);
            }
            // <li key={index}><a  className='upItem' data-id={goods.item_id}><div className="info-img">{/*<LazyLoad offset={100} once>*/}<img alt="" className="lazy" src={goods.list_image}/>{/*</LazyLoad>*/}</div><div className="info-bar"><div className="pro-title">{goods.goods_name}</div><div className="e-numb"><span className="e-price"><em>{goods.item_price}</em>积分</span></div></div></a>      </li>
        onRetryLoading() {
            console.log('retry loading');
            this.props.updateLoadingStatus(1); // 恢复loading界面
            this.props.beginRefresh(); // 发起数据刷新
        }
        renderLoading() {

            const _this = this;
            const onRetryLoading = this.onRetryLoading.bind(this)
            let outerStyle = {
                height: window.innerHeight
            };
            return (
                <div>
                <LoadingLayer outerStyle={outerStyle} onRetry={onRetryLoading}
                    loadingStatus={this.props.loadingStatus}
                />
            </div>
            );
        }
        renderPage() {

            let lis = this.props.items.map((goods, index) => {
                return (
                    <li key={index}><Link  to={'/redux_search.html/R_det/'+goods.item_id} className='upItem' data-id={goods.item_id}><div className="info-img">{/*<LazyLoad offset={100} once>*/}<img alt="" className="lazy" src={goods.list_image}/>{/*</LazyLoad>*/}</div><div className="info-bar"><div className="pro-title">{goods.goods_name}</div><div className="e-numb"><span className="e-price"><em>{goods.item_price}</em>积分</span></div></div></Link>      </li>

                );
            })
            return (
                <div className="w result-wp" >
        <div className="result-sort">
            <li className="cur">综合</li>
        <li className="volume">兑换排行</li>
            <li className="arrow price">香蕉</li>
            <li className="icons-list ver-icon"></li>
        </div>

                <div id = "ScrollContainer" >
                <div id = "ListOutsite" style ={{height: window.innerHeight}}
                     onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}>
            <ul id="ListInside"  className="app-pd-list hor-list">
        <p ref="PullDown" id="PullDown" dangerouslySetInnerHTML={{__html:this.pullDownTips[this.props.pullDownStatus]}} />

        {
            lis
        }
                        <p ref="PullUp" id="PullUp" dangerouslySetInnerHTML={{__html:this.pullUpTips[this.props.pullUpStatus]}} />

            </ul>
         </div>
         </div>
         </div>
            );
        }

        render() {

            // 首屏没有加载成功，那么均展示loading效果
            if (this.props.loadingStatus != 2) {
                return this.renderLoading();
            } else {
                return this.renderPage();
            }
        }
    }
    // const mapStateToProps = state => {
    //     const {
    //         searchPagedReddit,
    //         postsByReddit
    //     } = state
    //     const {
    //         isFetching,

//         items: posts
//     } = postsByReddit[searchPagedReddit] || {
//         isFetching: true,
//         items: []
//     }
//     return {
//         searchPagedReddit,
//         posts,
//         status,
//         isFetching

//     }
// }
// export default connect(mapStateToProps)(ResultWrap)

export default ResultWrap;