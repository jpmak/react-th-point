import React from 'react';
import $ from 'jquery';

import {
    Link
} from 'react-router-dom'
let keyword = '';
let arrval = new Array();
class SearchBtn extends React.Component {
    constructor(props) {
            super(props);
            this.state = {
                parmkeyword: 'wo'
            }
            this._handleClick = () => {
                let p = new Promise(function(resolve, reject) {});
                let sVal = $('#searchInput').val();
                console.log(sVal);
                if (sVal != '') {
                    const _this = this;
                    _this.props.funStoreHistory(sVal)
                        // _this.refs.getarr.funStoreHistory(sVal);
                        // _this.refs.getarr.pushSearch();

                }
            }

            // this._handleClick = () => {
            //     var sVal = $('#searchInput').val();
            //     if (sVal != '') {
            //         const _this = this;
            //         keyword = sVal;
            //         // funStoreHistory();
            //     }
            // }
        }
        // componentDidMount() {
        //     const _this = this;
        //     if (window.localStorage.searchhistory) {
        //         searchMsg = JSON.parse(window.localStorage.searchhistory);
        //         // arrval.push(searchMsg);
        //         this.historyHtml();
        //         arrval = arrval.concat(searchMsg);
        //     } else {
        //         $('.search-keywords').hide();
        //     }

    // 
    // }
    // Link to={'/search/'+this.state.parmkeyword}
    render() {

        return (<Link to={'/search/'+this.props.value}  className = "search-btn" onClick = {(e)=>e.preventDefault(),this._handleClick.bind(this)} > 搜索 </Link>)
    }
}
export default SearchBtn;