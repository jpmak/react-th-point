import React from 'react';
import {
    connect
} from 'react-redux'
import $ from 'jquery';
import Goback from '../components/public/Goback';
// import ResultWrap from '../components/search/ResultWrap';
import SearchInput from '../components/search/SearchInput';
import DelValue from '../components/search/DelValue';
import SearchBtn from '../components/search/SearchBtn';
import SearchResult from '../components/search/SearchResult';
import ListNav from '../components/list/ListNav';


import {
    ListTryRestoreComponent,
    fetchListNav,
    fetchListGoods,
    beginRefresh
} from '../actions/list'


class List extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            value: '',
            message: '',
            searchMsgStatus: false,
            pushSearch: true,
            wrapHeight: 0
        };

    }
    componentWillMount() {
        this.props.dispatch(ListTryRestoreComponent());

    }
    componentDidMount() {
        let windowHeight = window.screen.height;
        let searchBox = document.getElementById("boxHeight").offsetHeight;

        this.setState({
                wrapHeight: windowHeight - searchBox
            })
            // console.log(document.getElementById("boxHeight").offsetHeight);
        if (this.props.listLoadingStatus === 1) {
            this.props.dispatch(beginRefresh());
        }
    }



    componentWillReceiveProps(nextProps) {


        }
        //search
    funStoreHistory(e) {
        this.refs.getarr.funStoreHistory(e)
    }
    searchMsgStatus_fun(e) {
        this.setState({
            searchMsgStatus: e
        });
    }
    pushValue(e) {
        this.setState({
            value: e
        })
    }
    historyPush(e) {
        this.props.history.push('/search/' + e)
    }
    _handleClick(e) {
        this.refs.getarr.funStoreHistory(e);
        // this.refs.getarr.pushSearch();
    }
    handleDel() {
        $('#searchInput').val('').focus();
        $('#del').hide();

    }
    clearValue() {
            this.setState({
                value: ''
            });
            this.refs.SearchInput.clearValue();
        }
        //search
    getListGoods(id) {
        this.props.dispatch(fetchListGoods(id));

    }

    render() {
        return (<div>
           <div className= 'th-search-container th-nav-list pr on-focus'>

            <div id='boxHeight' className="th-search-box">
                <div className="th-search-shadow"></div>
         <GobackUp />
  <SearchBtn funStoreHistory={this.funStoreHistory.bind(this)} value={this.state.value}/>
        {/*<a className="search-btn" onClick={this._handleClick.bind(this)}>搜索</a>*/}
                    <div className="wbox search-bar" >
                    <i className="th-search-iconbtn"></i>
        <DelValue handleDel={this.clearValue.bind(this)}/>
                    <div className="wbox-flex">
               <div className="th-search-form">
            
     <SearchInput  ref='SearchInput' pushValue={this.pushValue.bind(this)} historyPush={this.historyPush.bind(this)} parmKeyword={ this.props.parmKeyword}  _handleClick={this._handleClick.bind(this)} searchMsgStatus={this.state.searchMsgStatus}/>

                        </div>
                    </div>
     
                </div>
            </div>

<SearchResult ref="getarr"  searchMsgStatus_fun={ this.searchMsgStatus_fun.bind(this)} handleDel = {this.handleDel.bind(this)}  />

        </div>
            <div id="js-list">
        <div className="list-wrap wbox" style={{height:this.state.wrapHeight}}>
    
        <ListNav navItems={this.props.navItems} height={this.state.wrapHeight} listGoods={this.getListGoods.bind(this)}/>
  
        </div>
    </div></div>);
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

        listLoadingStatus: state.MsgListReducer.listLoadingStatus,
        navStatus: state.MsgListReducer.navStatus,
        navItems: state.MsgListReducer.navItems,
        GoodItems: state.MsgListReducer.GoodItems,

    }
}


export default connect(mapStateToProps)(List)