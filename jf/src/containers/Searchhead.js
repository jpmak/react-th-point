import React from 'react';
import {
    connect
} from 'react-redux'
import $ from 'jquery';
import Goback from '../components/public/Goback';
import ResultWrap from '../components/search/ResultWrap';
import SearchInput from '../components/search/SearchInput';
import DelValue from '../components/search/DelValue';
import SearchBtn from '../components/search/SearchBtn';
import SearchResult from '../components/search/SearchResult';


import {
    SearchBeginRefresh,
    SearchTryRestoreComponent,
    updateLoadingStatus,
    beginLoad,
    updatePullUpStatus,
    updatePullDownStatus,
    backupIScrollY,
    getKeyword,
    searchNum,
    price,
    volume,
    cate_id,


} from '../actions/search'

// import {
//     bindActionCreators
// } from 'redux'



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
            pushSearch: true
        };
        this.searchhistory_ev = false;



        this.searchMsg = window.localStorage.searchhistory ? JSON.parse(window.localStorage.searchhistory) : '';

    }

    pushSearch(e) {
        // this.props.history.push('/product/384.html');

        let p = new Promise(function(resolve, reject) {});
        // this.refs.getarr.funStoreHistory(e);
        // this.refs.getarr.pushSearch();
        // console.log(e);
        // this.props.history.push('/serach/' + e)
        p.then(this.refs.getarr.funStoreHistory(e))
            .then(this.refs.getarr.pushSearch(e))


    }
    funStoreHistory(e) {
        this.refs.getarr.funStoreHistory(e)
    }
    historyPush(e) {
        this.props.history.push('/search/' + e)
    }
    pushValue(e) {
        this.setState({
            value: e
        })
    }
    clearValue() {
        this.setState({
            value: ''
        });
        this.refs.SearchInput.clearValue();
    }
    _handleClick(e) {
        this.refs.getarr.funStoreHistory(e);
    }
    searchhistory(ev) {
        this.searchhistory_ev = ev;
    }
    funloadHistory() {
        if (window.localStorage.searchhistory) {
            this.props.dispatch(getKeyword(this.searchMsg[0]));
            // 
            // this.props.dispatch(getKeyword(this.props.match.params.keyword))
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
    }


    searchMsgStatus_fun(e) {
        this.setState({
            searchMsgStatus: e
        });
    }
    updataPushSearch() {
        this.setState({
            pushSearch: true
        });
    }
    handleDel() {
        $('#searchInput').val('').focus();
        $('#del').hide();
        $('.search-bar input').css('width', '100%');
    }
    pageChange() {
        this.props.dispatch({
            type: 'SEARCHPAGE_REDDIT'
        })
    }
    tryRestoreComponent() {
        this.props.dispatch(SearchTryRestoreComponent())

    }
    beginRefresh() {
        this.props.dispatch(SearchBeginRefresh())
    }
    searchNum() {
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
        this.props.dispatch(SearchBeginRefresh())


    }
    volumeClick(e) {
        this.props.dispatch(volume(e))
        this.props.dispatch(price(''))
        this.onloadScroll();
        this.props.dispatch(SearchBeginRefresh())
    }
    cate_idClick(e) {
        this.props.dispatch(cate_id(e))
        this.props.dispatch(price(''))
        this.props.dispatch(getKeyword(''))
            // this.onloadScroll();
        this.props.dispatch(SearchBeginRefresh())
    }
    keywordClick(e) {
        this.props.dispatch(price(''))
        this.props.dispatch(cate_id(''))

        this.props.dispatch(getKeyword(e))

        this.onloadScroll();
        this.props.dispatch(SearchBeginRefresh())
    }
    _keywordClick(e) {
        this.props.dispatch(getKeyword(e))
        this.props.dispatch(SearchBeginRefresh())
    }
    priceClick(e) {
        this.props.dispatch(price(e));
        this.onloadScroll();
        setTimeout(() => {
            this.props.dispatch(SearchBeginRefresh())
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
    componentWillReceiveProps(nextProps) {
        if (nextProps.keyword !== this.props.keyword) {
            this.setState({
                value: nextProps.keyword
            });
        }
        if (nextProps.match.params.keyword !== this.props.match.params.keyword) {
            this.searchNum();
            this.setState({
                searchMsgStatus: 1
            });

            this.keywordClick(nextProps.match.params.keyword)
        }
        // if (nextProps.match.params.keyword !== this.props.match.params.keyword) {
        //     this.searchNum();
        //     this.setState({
        //         searchMsgStatus: 1
        //     });

        //     this.keywordClick(nextProps.match.params.keyword)
        // }
        // if (nextProps.match.params.id !== this.props.match.params.id) {
        //     this.cate_idClick(nextProps.match.params.id)
        // }
    }

    render() {

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

        return (<div> 
            <div className= {'th-search-container th-nav-list pr on-focus'} >

            <div className="th-search-box">
                <div className="th-search-shadow"></div>
         <GobackUp />
        <SearchBtn funStoreHistory={this.funStoreHistory.bind(this)} value={this.state.value}/>
        { /*<a className="search-btn" onClick={this._handleClick.bind(this)}>搜索</a>*/ }
                    <div className="wbox search-bar" >
                    <i className="th-search-iconbtn"></i>
        <DelValue handleDel={this.clearValue.bind(this)}/>
                    <div className="wbox-flex">
               <div className="th-search-form">
            
        <SearchInput ref='SearchInput' searchMsgStatus={this.state.searchMsgStatus} pushValue={this.pushValue.bind(this)} funStoreHistory={this.funStoreHistory.bind(this)} parmKeyword={ this.props.match.params.keyword}  />

                        </div>
                    </div>
     
                </div>
            </div>

 <SearchResult ref = "getarr" historyPush={this.historyPush.bind(this)} handleDel = {this.handleDel.bind(this)}
        searchNum = {this.searchNum.bind(this)}
        onloadScroll = {this.onloadScroll.bind(this)}
 ensureIScrollInstalled={this.ensureIScrollInstalled.bind(this)}
 searchMsgStatus_fun={ this.searchMsgStatus_fun.bind(this)}     
  searchhistory = {this.searchhistory.bind(this)}
        keyword = {keyword}     parmKeyword={ this.props.match.params.keyword} 
        pullDownStatus = {pullDownStatus}
            pullUpStatus = {pullUpStatus}
                 loadingStatus = {loadingStatus}
            updataPushSearch={this.updataPushSearch.bind(this)}
            keywordClick={this.keywordClick.bind(this)}
     getKeyword = {this.getKeyword.bind(this)}
     priceClick = {this.priceClick.bind(this)}
   beginRefresh = {this.beginRefresh.bind(this)}
   beginLoad = {this.beginLoad.bind(this)}
   updateLoadingStatus = {this.updateLoadingStatus.bind(this) }
        updatePullDownStatus = {this.updatePullDownStatus.bind(this)}
        updatePullUpStatus = {this.updatePullUpStatus.bind(this)}
            />

        </div>

            <ResultWrap ref = "getload" value={this.state.value} items = {items} status = {status} _keywordClick={this._keywordClick.bind(this)}  parmKeyword={ this.props.match.params.keyword}  y = {y}  price={price}  searchNum={searchNum}    backupIScrollY = {this.backupIScrollY.bind(this)} pageStatus = {pageStatus}  tryRestoreComponent = {this.tryRestoreComponent.bind(this)}
                      defaultClick = {this.defaultClick.bind(this)}  cate_idClick={this.cate_idClick.bind(this)} priceClick = {this.priceClick.bind(this)}
               volumeClick = {this.volumeClick.bind(this)}  beginRefresh = {this.beginRefresh.bind(this)}
            beginLoad = {this.beginLoad.bind(this)}    updateLoadingStatus = {this.updateLoadingStatus.bind(this)}
            pullDownStatus = {pullDownStatus} pullUpStatus = {pullUpStatus} loadingStatus = {loadingStatus}
            updatePullDownStatus = {this.updatePullDownStatus.bind(this)} updatePullUpStatus = {
                this.updatePullUpStatus.bind(this)
            }
            /> </div>);
    }
}



class GobackUp extends React.Component {

    handClick() {
        $('#searchInput').blur();
        $('#js-list,.class,.result-wp').show();
        $('.search-wrap,.th-search-box .backbtn,.fixedSearch').hide();
    }

    render() {
        return (
            <div>
         <Goback/>
                <a className="backbtn" onClick={this.handClick.bind(this)}> </a>
               </div>
        )
    }
}



const mapStateToProps = state => {
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
        searchNum: state.MsgListPageReducer.searchNum,
    }
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators(dispatch);
// }
export default connect(mapStateToProps)(Searchhead)