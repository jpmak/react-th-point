import React from 'react';
let keyword = '';
let arrval = new Array();
class SearchBtn extends React.Component {
    constructor(props) {
        super(props);

        this._handleClick = () => {
            var sVal = $('#searchInput').val();
            if (sVal != '') {
                const _this = this;
                keyword = sVal;
                funStoreHistory();
            }
        }
    }
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


    }

    render() {
        return (
            <a className="search-btn" onClick={this._handleClick.bind(this)}>搜索</a>
        )


    }
}
export default SearchBtn;