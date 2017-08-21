import React from 'react';
import SortsBtn from './public/SortsBtn';
import SearchInput from './search/SearchInput';
import Goback from './public/Goback';
import Goback_up from './public/Goback_up';
import Del_val from './search/Del_val';
import SearchBtn from './search/SearchBtn';
import SearchResult from './search/SearchResult';

import $ from 'jquery';

let searchMsg = '';
let arrval = new Array();
let keyword = '';

var Backbtn = React.createClass({

    render: function() {
        return (
            <a className="backbtn"></a>
        )
    }
});


// class SearchResult extends React.Component {

//     componentDidMount() {

//         const _this = this;
//         if (window.localStorage.searchhistory) {
//             searchMsg = JSON.parse(window.localStorage.searchhistory);
//             // arrval.push(searchMsg);
//             this.historyHtml();
//             arrval = arrval.concat(searchMsg);
//         } else {
//             $('.search-keywords').hide();
//         }
//         $('.search-keywords-list li a').on('click', function() {
//             var sVal = $('#searchInput').val();
//             var hVal = $(this).html();
//             $('#searchInput').val(hVal);
//             _this.funStoreHistory();

//         });
//         // $('.delbtn').on('click', function() {
//         //     if (confirm("确定要清空吗？")) {
//         //         localStorage.removeItem("searchhistory");
//         //         $('.search-wrap').remove();
//         //         arrval = [];

//         //     }

//         // });
//     }

//     funStoreHistory() {
//         arrval.unshift($('#searchInput').val());
//         if (arrval.length > 9) {
//             arrval.pop(9);
//         }
//         // arrval=unique(arrval);
//         arrval = this.unique(arrval);
//         window.localStorage.searchhistory = JSON.stringify(arrval);
//         keyword = arrval[0];
//         window.location.href = 'search.html';
//         // window.location.reload();
//     }
//     unique(arr) {
//         var res = [];
//         var json = {};
//         for (var i = 0; i < arr.length; i++) {
//             if (!json[arr[i]]) {
//                 res.push(arr[i]);
//                 json[arr[i]] = 1;
//             }
//         }
//         return res;
//     }
//     historyHtml() {
//         let history_Html = '';
//         for (var i = 0; i < searchMsg.length; i++) {
//             history_Html += '<li><a>' + searchMsg[i] + '</a></li>';
//         }
//         $('.search-keywords-list').html(history_Html);

//     }
//     render() {
//         return (
//             <div className = "search-wrap" >
//             <div className="search-keywords bor-b">
//                 <div className="search-keywords-name">
//         <span>历史记录 <i className="delbtn"></i></span>
//                 </div>
//                 <div className="search-keywords-list ">
//                 </div>
//             </div>
//             </div>
//         )
//     }
// }


var SearchBox = React.createClass({
    getInitialState: function() {
        return {
            value: ''
        };
    },

    handleChange: function(event) {
        this.setState({
            value: event.target.value
        });
    },
    handleDel: function() {
        $('#searchInput').val('').focus();
        $('#del').hide();
        $('.search-bar input').css('width', '100%');
    },

    componentDidMount: function() {
        const _this = this;
        $('#searchInput').on('keyup focus', function(e) {
            $('.search-bar input').css('width', '80%');
            var uVal = $('#searchInput').val();
            if (uVal != '') {
                if (e.keyCode === 13) {
                    _this._handleClick();
                }
                $('#del').show();
            } else {
                $('#del').hide();
            }
        });
        $('#searchInput').on('click', function() {

            $('#headnav').addClass('js-header');

            $('#js-list,.sorts,.result-wp').hide();
            $('.th-search-container').addClass('on-focus');
            $('.th-search-container').removeClass('on-blur');
            $('.search-wrap,.th-search-box .backbtn').show();
            $('.th-active,.th-active body').css('overflow', 'auto');
        });
        $('#searchInput').on('keyup focus', function(e) {
            $('.search-bar input').css('width', '80%');
            var uVal = $('#searchInput').val();
            if (uVal !== '') {
                if (e.keyCode === 13) {
                    _this._handleClick();
                }
                $('#del').show();
            } else {
                $('#del').hide();
            }
        });
    },
    _handleClick: function() {
        var sVal = $('#searchInput').val();

        if (sVal != '') {
            const _this = this;
            keyword = sVal;
            _this.refs.getarr.funStoreHistory();
        }
    },
    render: function() {
        var value = this.state.value;
        return (
            <div className="th-search-container on-blur" style={{'display': 'block'}}>
            <div className="th-search-box">
                <div className="th-search-shadow"></div>
                      <SortsBtn Sorthref="category.html"/>
  
        <Goback_up/>
        <a className="search-btn" onClick={this._handleClick}>搜索</a>


                <div className="wbox search-bar">
                    <i className="th-search-iconbtn"></i>
                    <div id="del" className="delete" onClick={this.handleDel} ></div>
                    <div className="wbox-flex">
                        <input id="searchInput" className="th-search-form" type="text" placeholder="搜索商品关键字"  value={value}  onChange={this.handleChange}/>
                    </div>
                </div>

            </div>
<SearchResult ref="getarr"/>
        </div>

        )
    }
})



export default SearchBox;