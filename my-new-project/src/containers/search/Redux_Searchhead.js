import React from 'react';
// import React, {
//     Component
// } from 'react'
import PropTypes from 'prop-types'
import {
    connect
} from 'react-redux'

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import $ from 'jquery';

import Goback from 'components/public/Goback';
import ResultWrap from 'components/search/ResultWrap';

import {
    beginRefresh,
    tryRestoreComponent,
    updateLoadingStatus,
    beginLoad,
    updatePullUpStatus,
    updatePullDownStatus,
    backupIScrollY,
    getKeyword,
    searchNum,
    price,
    volume,
    begin,
    fetchPostsIfNeeded
} from 'actions/search'

import {
    bindActionCreators
} from 'redux'

const urlRoot = '';


let searchMsg = '';
// let arrval = new Array();
// let sVal = '';

class Searchhead extends React.Component {

    // static propTypes = {
    //     searchPagedReddit: PropTypes.number.isRequired,
    //     posts: PropTypes.array.isRequired,
    //     dispatch: PropTypes.func.isRequired
    // }

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            message: '',
            searchMsgStatus: false,
            pushSearch:true
        };
        this.searchhistory_ev = false;

        this.handleChange = (event) => {
            let val = event.target.value;
            val = val.replace(/["'<>%;)(&+, ]/g, '');
            this.setState({
                value: val
            });

        }


        this.searchMsg = window.localStorage.searchhistory ? JSON.parse(window.localStorage.searchhistory) : '';
        this._handleClick = () => {
            var sVal = $('#searchInput').val();
            if (sVal != '') {
                const _this = this;
                // keyword = sVal;
                _this.refs.getarr.funStoreHistory(sVal);
            }
        }
    }



    searchhistory(ev) {
        this.searchhistory_ev = ev;
    }
    funloadHistory() {
        if (window.localStorage.searchhistory) {
            // this.searchMsg = JSON.parse(window.localStorage.searchhistory);
            this.props.dispatch(getKeyword(this.searchMsg[0]));
        }
    }
    componentWillMount() {
        this.funloadHistory();
        if (window.localStorage.searchhistory) {
            this.setState({
                searchMsgStatus: true
            });
            // this.searchhistory_ev = true;
        }
    }
    componentDidMount(e) {

        this.setState({
            value: this.searchMsg[0]
        });

        const _this = this;

        // $('#searchInput').on('click', function() {

        //     // $('#js-list,.class,.result-wp').hide();
        //     // $('.th-search-box .backbtn').show();

        //     // $('.th-active,.th-active body').css('overflow', 'auto');

        // });
        // $('#searchInput').on('keyup focus', function(e) {

        //     $('.search-bar input').css('width', '80%');
        //     var uVal = $('#searchInput').val();
        //     if (_this.searchhistory_ev) {
        //         $('.search-wrap').css('display', 'block');

        //     }
        //     if (uVal !== '') {
        //         if (e.keyCode === 13) {
        //             _this._handleClick();
        //         }
        //         $('#del').show();
        //     } else {
        //         $('#del').hide();
        //     }
        // });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.keyword !== this.props.keyword) {
            this.setState({
                value: nextProps.keyword
            });

        }
    }


    searchInputonKeyUp(e) {
        if (this.state.value != '') {
            if (e.keyCode === 13) {
                this._handleClick();
            }
            $('#del').show();
        }

    }
    searchMsgStatus_fun(e) {
        this.setState({
            searchMsgStatus: e
        });
    }
    searchInputClick() {

        $('#js-list,.class,.result-wp').hide();
        $('.th-search-box .backbtn').show();

        $('.th-active,.th-active body').css('overflow', 'auto');


        $('.search-bar input').css('width', '80%');
        if (this.state.value != '') {
            $('#del').show();
        }
        if (this.state.searchMsgStatus) {
            $('.search-wrap').css('display', 'block');
        }

    }
updataPushSearch(){
     this.setState({
            pushSearch: true
        });
}
    handleDel() {
        this.setState({
            value: ''
        });
        $('#searchInput').val('').focus();

        $('#del').hide();
        $('.search-bar input').css('width', '100%');
    }
    fetchPostsIfNeeded() {
        const {
            dispatch,
            searchPagedReddit
        } = this.props
        dispatch(fetchPostsIfNeeded(searchPagedReddit))
    }



    pageChange = () => {

        this.props.dispatch({
            type: 'SEARCHPAGE_REDDIT'
        })

    }
    tryRestoreComponent() {
        this.props.dispatch(tryRestoreComponent())

    }
    beginRefresh() {
        this.props.dispatch(beginRefresh())
    }
    searchNum() {
        console.log('+++++++++')
        this.props.dispatch(searchNum())
    }
    updateLoadingStatus(e) {
        this.props.dispatch(updateLoadingStatus(e))

    }
    backupIScrollY(e) {
        this.props.dispatch(backupIScrollY(e))

    }
    getKeyword(e) {

        this.props.dispatch(getKeyword(e))

    }
    defaultClick() {
        this.onloadScroll();
        this.props.dispatch(price(''))
        this.props.dispatch(beginRefresh())


    }
    volumeClick(e) {
        this.props.dispatch(volume(e))
        this.props.dispatch(price(''))

        this.onloadScroll();

        this.props.dispatch(beginRefresh())


    }
    priceClick(e) {
        this.props.dispatch(price(e));
        this.onloadScroll();
        setTimeout(() => {
            this.props.dispatch(beginRefresh())
        }, 0);

    }
    beginLoad() {
        this.props.dispatch(beginLoad())

    }
    onloadScroll() {
        this.refs.getload.onloadScroll();
    }
    ensureIScrollInstalled() {
        this.refs.getload.ensureIScrollInstalled();

    }
    updatePullDownStatus(e) {
        // console.log(e);
        this.props.dispatch(updatePullDownStatus(e))
    }
    updatePullUpStatus(e) {
        this.props.dispatch(updatePullUpStatus(e))
    }

    render() {
        const value = this.state.value;
        const _this = this;

        const {
            items,
            status,
            y,
            keyword,
            searchNum,
            price,
            pullDownStatus,
            pullUpStatus,
            loadingStatus,
            pageStatus
        } = this.props

        return (<div> { /*fetchPostsIfNeeded={_this.fetchPostsIfNeeded.bind(this)} pageChange={_this.pageChange.bind(this)}*/ }
            <div className= {'th-search-container th-nav-list pr on-focus'} >
         
            <div className="th-search-box">
                <div className="th-search-shadow"></div>
         <Goback_up ref='Goback_up'/>
        <a className="search-btn" onClick={this._handleClick.bind(this)}>搜索</a>
                    <div className="wbox search-bar" >
                    <i className="th-search-iconbtn"></i>
                    <div id="del" className="delete" onClick={this.handleDel.bind(this)} ></div>
                    <div className="wbox-flex">
               <div className="th-search-form">
        <input id="searchInput" className="th-search-form" type="text" placeholder="搜索商品关键字"  value={value} onClick={this.searchInputClick.bind(this)} onKeyUp={this.searchInputonKeyUp.bind(this)}  onChange={this.handleChange}/>
                        </div>
                    </div>
     
                </div>
            </div>

 <SearchResult ref = "getarr" handleDel={_this.handleDel.bind(this)} searchNum={_this.searchNum.bind(this)} onloadScroll={_this.onloadScroll.bind(this)}
 ensureIScrollInstalled={_this.ensureIScrollInstalled.bind(this)}
 searchMsgStatus_fun={ _this.searchMsgStatus_fun.bind(this)}     
  searchhistory = {_this.searchhistory.bind(this)}
        keyword = {keyword}
         pullDownStatus = {
                pullDownStatus
            }
            pullUpStatus = {
                pullUpStatus
            }
                 loadingStatus = {
                loadingStatus
            }
            updataPushSearch={_this.updataPushSearch.bind(this)}
     getKeyword = {_this.getKeyword.bind(this)}
     priceClick = {_this.priceClick.bind(this)}
   beginRefresh = {_this.beginRefresh.bind(this)}
   beginLoad = {_this.beginLoad.bind(this)}
   updateLoadingStatus = {_this.updateLoadingStatus.bind(this) }
        updatePullDownStatus = {
            _this.updatePullDownStatus.bind(this)
        }
        updatePullUpStatus = {
            _this.updatePullUpStatus.bind(this)
        }
            />

        </div>

            <ResultWrap ref = "getload" items = {items} status = {status} y = {y}  price={price}  searchNum={searchNum}    backupIScrollY = {_this.backupIScrollY.bind(this)} pageStatus = {               pageStatus
            }
            tryRestoreComponent = {
                _this.tryRestoreComponent.bind(this)
            }
                      defaultClick = {
                _this.defaultClick.bind(this)
            }
   priceClick = {
                _this.priceClick.bind(this)
            }

               volumeClick = {
                _this.volumeClick.bind(this)
            }
            beginRefresh = {
                _this.beginRefresh.bind(this)
            }
            beginLoad = {
                _this.beginLoad.bind(this)
            }
            updateLoadingStatus = {
                _this.updateLoadingStatus.bind(this)
            }
            pullDownStatus = {
                pullDownStatus
            }
            pullUpStatus = {
                pullUpStatus
            }
            loadingStatus = {
                loadingStatus
            }
            updatePullDownStatus = {
                _this.updatePullDownStatus.bind(this)
            }
            updatePullUpStatus = {
                _this.updatePullUpStatus.bind(this)
            }
            /> </div>);
    }
}



class Goback_up extends React.Component {
    componentDidMount() {}
    handClick() {
        $('#searchInput').blur();
        $('#js-list,.class,.result-wp').show();
        $('.search-wrap,.th-search-box .backbtn').hide();
    }

    render() {
        return (
            <div>
         <Goback/>
                <a className="backbtn" onClick={this.handClick}></a>
               </div>
        )
    }
}

class SearchResult extends React.Component {
    constructor(props, context) {
        super(props, context);
        // this.arrval = [];
        this.searchMsg = '';
        this._props = this.props;
        this.state = {
            history_Html: '',
            arrval: []
        };


    }
    componentWillMount() {
        if (window.localStorage.searchhistory) {
            this.searchMsg = JSON.parse(window.localStorage.searchhistory);
            // arrval.push(searchMsg);
            // this.historyHtml();
            this.state.arrval = this.state.arrval.concat(this.searchMsg);
        } else {
            $('.search-keywords').hide();
        }
    }

    componentDidMount() {

        const _this = this;
        // $('.search-keywords-list li a').on('click', function() {
        //     let hVal = $(this).html();
        //     _this.funStoreHistory(hVal);
        // });


    }
    PreventDefault(e) {
        e.preventDefault();
    }

    delbtnClick() {
        const _this = this;
        this.setState({
            arrval: []
        });
        if (confirm('确定要清空吗？')) {
            // this.arrval.length = 0;

            localStorage.removeItem('searchhistory');
            $('.search-wrap').hide();
            // $('#searchInput').val('').focus();
            // _this.props.searchhistory(false);
            this.props.searchMsgStatus_fun(false);
            this.props.handleDel();
        }

    }
    handClick() {
        $('#searchInput').blur();
        $('#js-list,.class,.result-wp').show();
        $('.search-wrap,.th-search-box .backbtn').hide();
    }
    funStoreHistory(e) {

        // 


        this.props.searchMsgStatus_fun(true);
        var sVal = $('#searchInput').val();
        this.state.arrval.unshift(e);
        if (this.state.arrval.length > 9) {
            this.state.arrval.pop(9);
        }
        // arrval=unique(arrval);
        this.state.arrval = this.unique(this.state.arrval);
        window.localStorage.searchhistory = JSON.stringify(this.state.arrval);
        this.handClick();
        // this.props.updateLoadingStatus(1);
        // this.props.updatePullDownStatus(3);
        // this.props.updatePullUpStatus(6);
        // console.log('keyword= ' + this.props.keyword);
        // 
        // 
        // setTimeout(() => {
        // console.log('keyword= ' + this.props.keyword);
        // this.props.onloadScroll();
        if (this.props.loadingStatus != 4) {
            this.props.onloadScroll()
        }
        // this.props.updateLoadingStatus(1); // 恢复loading界面
        // this.props.ensureIScrollInstalled(); //refresh重新计算滚动条信息
        // let p = new Promise();
        let p = new Promise(function(resolve, reject) {
            // console.log('start new Promise...');
        });
        this.props.searchNum();
        p.then(this.props.getKeyword(this.state.arrval[0]))
            .then(this.props.priceClick(''))



        // }, 0);
        // this.props.beginRefresh();
        // this.props.beginLoad()
        // window.location.reload();

   
    }
    unique(arr) {
        var res = [];
        var json = {};
        for (var i = 0; i < arr.length; i++) {
            if (!json[arr[i]]) {
                res.push(arr[i]);
                json[arr[i]] = 1;
            }
        }
        return res;
    }


    render() {
        const _this = this;
        let history_Html = this.state.arrval.map(function(Msg, index) {
            return (
                <li key={index}><a onClick={_this.funStoreHistory.bind(_this,Msg)}>{Msg}</a></li>
                // <li key={index}><a onClick={(e) => {e.preventDefault();this.hand_li_Click.bind(this);}}>{Msg}</a></li>
            )

        });
        return (

            <div className = "search-wrap" >
            <div className="search-keywords bor-b">
                <div className="search-keywords-name">
                    <span>历史记录 <i className="delbtn" onClick={this.delbtnClick.bind(this)}></i></span>
                </div>
                <div className="search-keywords-list ">
        {
       history_Html
        }
                </div>
            </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    const {
        searchPagedReddit,
        postsByReddit
    } = state
    const {
        isFetching,
        is_items: posts,
        status: status
    } = postsByReddit[searchPagedReddit] || {
        isFetching: true,
        is_items: [],
        status: 0
    }
    return {
        //iscroll//
        items: state.MsgListPageReducer.items,
        pageStatus: state.MsgListPageReducer.pageStatus,
        pullDownStatus: state.MsgListPageReducer.pullDownStatus, // 下拉状态
        pullUpStatus: state.MsgListPageReducer.pullUpStatus, // 上拉状态
        loadingStatus: state.MsgListPageReducer.loadingStatus, // 首屏加载状态
        page: state.MsgListPageReducer.page,
        y: state.MsgListPageReducer.y,
        keyword: state.MsgListPageReducer.keyword,
        volume: state.MsgListPageReducer.volume,
        price: state.MsgListPageReducer.price,
        searchNum:state.MsgListPageReducer.searchNum,

        //iscroll//
        searchPagedReddit,
        posts,
        status,
        isFetching

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps)(Searchhead)

// export {
//     Searchhead,
//     ResultWrap,
//     Goback_up
// }