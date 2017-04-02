import React from 'react';
let searchMsg = '';
let arrval = new Array();
let keyword = '';
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
            history_Html += '<li><a>' + searchMsg[i] + '</a></li>';
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
export default SearchResult;