import React from 'react';
import PropTypes from 'prop-types'
import $ from 'jquery';

class SearchInput extends React.Component {
    // static propTypes = {
    //     history: PropTypes.object.isRequired
    // }
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.parmKeyword
        };
        this.handleChange = (event) => {
            let val = event.target.value;
            val = val.replace(/["'<>%;)(&+, ]/g, '');
            this.props.pushValue(val)
            this.setState({
                value: val
            });

        }

    }
    clearValue() {
        this.setState({
            value: ''
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
        if (this.props.searchMsgStatus) {
            $('.search-wrap').css('display', 'block');
        }

    }
    searchInputonKeyUp(e) {
            const value = this.state.value
            if (this.state.value != '') {
                if (e.keyCode === 13) {
                    this.props.historyPush(value)
                    this.props._handleClick(value);
                }
                $('#del').show();
            }

        }
    componentWillReceiveProps(nextProps) {
        let p = new Promise(function(resolve, reject) {});
        if (nextProps.parmKeyword !== this.props.parmKeyword) {
            this.setState({
                value: nextProps.parmKeyword
            })
        }
    }
    render() {

        return (
            <input id="searchInput" className="th-search-form" type="text" placeholder="搜索商品关键字"  value={this.state.value} onClick={this.searchInputClick.bind(this)} onKeyUp={this.searchInputonKeyUp.bind(this)}  onChange={this.handleChange}/>
        )


    }
}

export default SearchInput;