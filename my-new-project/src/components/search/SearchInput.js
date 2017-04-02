import React from 'react';
class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = (event) => {
            this.setState({
                value: event.target.value
            });
        }
    }
    componentDidMount() {
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

    }
    render() {
        var value = this.state.value;
        return (
            <div className="wbox-flex">
               <div className="th-search-form">
        <input id="searchInput" className="th-search-form" type="text" placeholder="搜索商品关键字"  value={value}  onChange={this.handleChange}/>
                        </div>
                    </div>
        )


    }
}

export default SearchInput;