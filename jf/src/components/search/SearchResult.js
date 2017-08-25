import React from 'react';
import $ from 'jquery';
import {
    Link
} from 'react-router-dom'
class SearchResult extends React.Component {
    constructor(props, context) {
        super(props, context);
        // this.arrval = [];
        this.searchMsg = '';
        this._props = this.props;
        this.state = {
            history_Html: '',
            isCleanUp: false,
            arrval: []
        };


    }
    componentWillMount() {
        if (window.localStorage.searchhistory) {
            this.searchMsg = JSON.parse(window.localStorage.searchhistory);
            // arrval.push(searchMsg);
            // this.historyHtml();
            this.setState({
                arrval: this.state.arrval.concat(this.searchMsg)
            });
            // this.state.arrval = this.state.arrval.concat(this.searchMsg);
        } else {
            $('.search-keywords').hide();
        }
    }



    PreventDefault(e) {
        e.preventDefault();
    }
    delbtnClick(e) {
        e.preventDefault();


        if (window.confirm('确定要清空吗？')) {

            this.setState({
                arrval: []
            });
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

        this.state.arrval.unshift(e);
        if (this.state.arrval.length > 9) {
            this.state.arrval.pop(9);
        }

        this.setState({
            arrval: this.unique(this.state.arrval)
        });

        window.localStorage.searchhistory = JSON.stringify(this.state.arrval);
        this.handClick();

        if (this.props.loadingStatus !== 4) {
            // this.props.onloadScroll()
        }

        // let p = new Promise(function(resolve, reject) {

        // });
        // this.props.searchNum();
        // this.props.getKeyword(this.state.arrval[0])
        // this.props.priceClick('')
        // p.then(this.props.getKeyword(this.state.arrval[0]))
        //     .then(this.props.priceClick(''))
    }
    pushSearch(e) {

        this.props.searchNum();
        // this.props.getKeyword(e)

        this.props.getKeyword(this.state.arrval[0])
        this.props.priceClick('')
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.parmKeyword !== this.props.parmKeyword) {
            this.setState({
                // isCleanUp: false
            });
        }
    }

    render() {
        const _this = this;
        let history_Html = this.state.arrval.map(function(Msg, index) {
            return (
                <li key={index}><Link to={'/search/'+Msg} onClick={_this.funStoreHistory.bind(_this,Msg)} >{Msg}</Link></li>
            )

        });
        return (
            <div className = "search-wrap">
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
export default SearchResult;