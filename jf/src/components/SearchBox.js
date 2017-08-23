import React from 'react';
import SortsBtn from './public/SortsBtn';
import Goback from './public/Goback';
import Goback_up from './public/Goback_up';
import Del_val from './search/Del_val';
import SearchBtn from './search/SearchBtn';
import SearchInput from './search/SearchInput';
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


class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }
    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }
    handleDel() {
        $('#searchInput').val('').focus();
        $('#del').hide();
        $('.search-bar input').css('width', '100%');
    }

    componentDidMount() {
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
    }
    _handleClick() {
        var sVal = $('#searchInput').val();

        if (sVal != '') {
            const _this = this;
            keyword = sVal;
            _this.refs.getarr.funStoreHistory();
        }
    }
    pushSearch(e) {
        let p = new Promise(function(resolve, reject) {});
        p.then(this.refs.getarr.funStoreHistory(e))
            .then(this.refs.getarr.pushSearch(e))
    }
    funStoreHistory(e) {
        this.refs.getarr.funStoreHistory(e)
    }
    pushValue(e) {
        this.setState({
            value: e
        })
    }
    render() {
        return (
            <div className="th-search-container on-blur" style={{'display': 'block'}}>
            <div className="th-search-box">
                <div className="th-search-shadow"></div>
                      <SortsBtn Sorthref="category.html"/>
  
        <Goback_up/>
             <SearchBtn funStoreHistory={this.funStoreHistory.bind(this)} value={this.state.value}/>
                <div className="wbox search-bar">
                    <i className="th-search-iconbtn"></i>
                    <div id="del" className="delete" onClick={this.handleDel} ></div>
                    <div className="wbox-flex">
                   <SearchInput pushValue={this.pushValue.bind(this)} pushValue={this.pushValue.bind(this)}/>
                     
                    </div>
                </div>

            </div>
<SearchResult ref="getarr"/>
        </div>

        )
    }
}



export default SearchBox;