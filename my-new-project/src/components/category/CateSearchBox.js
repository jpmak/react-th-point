import React from 'react';
import Goback from '../public/Goback';
let sVal = '';
let keyword = '';
let page_state = 1;
let page = 0;
let volume = '';
let price = '';
let c_id = '';
let searchClick = 0;
let searchMsg = '';
let arrval = new Array();
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
    componentDidMount() {
        const _this = this;
        if (window.localStorage.searchhistory) {
            searchMsg = JSON.parse(window.localStorage.searchhistory);
            // arrval.push(searchMsg);
            this.historyHtml();
            arrval = arrval.concat(searchMsg);
        } else {
            $('.search-keywords').hide();
        }
        $('.search-keywords-list li a').on('click', function() {
            var sVal = $('#searchInput').val();
            var hVal = $(this).html();
            $('#searchInput').val(hVal);
            _this.funStoreHistory();

        });
        $('.delbtn').on('click', function() {
            if (confirm("确定要清空吗？")) {
                localStorage.removeItem("searchhistory");
                $('.search-wrap').remove();
                arrval = [];

            }

        });
    }

    funStoreHistory() {
        arrval.unshift($('#searchInput').val());
        if (arrval.length > 9) {
            arrval.pop(9);
        }
        // arrval=unique(arrval);
        arrval = this.unique(arrval);
        window.localStorage.searchhistory = JSON.stringify(arrval);
        keyword = arrval[0];
        window.location.reload();
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
    historyHtml() {
        let history_Html = '';
        for (var i = 0; i < searchMsg.length; i++) {
            history_Html += '<li><a href="/search.html">' + searchMsg[i] + '</a></li>';
        }
        $('.search-keywords-list').html(history_Html);

    }
    render() {
        return (
            <div className = "search-wrap" >
            <div className="search-keywords bor-b">
                <div className="search-keywords-name">
                    <span>历史记录 <i className="delbtn"></i></span>
                </div>
                <div className="search-keywords-list ">
                </div>
            </div>
            </div>
        )
    }
}
class CateSearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            message: ''
        };

        this.handleChange = (event) => {
            this.setState({
                value: event.target.value
            });
        }

        $('.delbtn').on('click', function() {
            if (confirm("确定要清空吗？")) {
                localStorage.removeItem("searchhistory");
                $('.search-wrap').remove();
                arrval = [];

            }

        });

        this._handleClick = () => {
            var sVal = $('#searchInput').val();

            if (sVal != '') {
                const _this = this;
                keyword = sVal;
                _this.refs.getarr.funStoreHistory();
            }
        }
    }
    funloadHistory() {
        if (window.localStorage.searchhistory) {
            keyword = arrval[0];
        } else {
            keyword = '';
        }

        $('#searchInput').val(keyword);
        this.refs.getload.sendAjax();
    }

    componentDidMount() {
        // this.funloadHistory()
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
            $('#js-list,.class,.result-wp').hide();
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
        // $('#searchInput').on('click', function() {
        //     $('#js-list,.class,.result-wp').hide();
        //     $('.search-wrap,.th-search-box .backbtn').show();
        //     $('.th-active,.th-active body').css('overflow', 'auto');

        // });

    }

    handleDel() {
        $('#searchInput').val('').focus();
        $('#del').hide();
        $('.search-bar input').css('width', '100%');
    }

    render() {
        var value = this.state.value;
        // <input type="text" value={this.state.value} onChange={this.handleClick} />
        return (
            <div>
        <div className= {'th-search-container th-nav-list pr'+ this.props.onName}>
            <div className="th-search-box">
                <div className="th-search-shadow"></div>
         <Goback_up/>
        <a className="search-btn" onClick={this._handleClick.bind(this)}>搜索</a>
                    <div className="wbox search-bar" >
                    <i className="th-search-iconbtn"></i>
                    <div id="del" className="delete" onClick={this.handleDel} ></div>
                    <div className="wbox-flex">
               <div className="th-search-form">
        <input id="searchInput" className="th-search-form" type="text" placeholder="搜索商品关键字"  value={value}  onChange={this.handleChange}/>
                        </div>
                    </div>
     
                </div>
            </div>
        </div>
<SearchResult ref="getarr"/>
            </div>
        );
    }
}
export default CateSearchBox;