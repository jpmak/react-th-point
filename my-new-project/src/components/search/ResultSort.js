import React from 'react';
import $ from 'jquery';

class ResultSort extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            price: true,
            priceVal: '',
            redColor: '',
            indexColor: ''
        }
    }
    componentDidUpdate() {

    }
    componentDidMount() {
        const _this = this;
        let price = ''
        $('.result-sort li').not('.icons-list').on('click', function() {
            var liindex = $('.result-sort li').index(this);
            $(this).addClass('cur').siblings().removeClass('cur');
            // if (liindex == 0) {
            //     price = '';

            // }
            // if (liindex == 1) {
            //     price = 'desc';

            // }
            // if (liindex == 2) {
            //     if ($('.result-sort li.arrow').hasClass('asc') || price == 'asc') {
            //         $('.result-sort li.arrow').removeClass('asc').addClass('desc');
            //         price = 'desc';
            //     } else {
            //         $('.result-sort li.arrow').removeClass('desc').addClass('asc');
            //         price = 'asc';
            //     }
            // }
            // _this.sendAjax();
        });

        $('.result-sort li.icons-list').on('click', function() {
            if ($('.result-sort li.icons-list').hasClass('ver-icon')) {
                $('.result-sort li.icons-list').removeClass('ver-icon');
                $('.result-sort li.icons-list').addClass('hor-icon');
            } else {
                $('.result-sort li.icons-list').addClass('ver-icon');
                $('.result-sort li.icons-list').removeClass('hor-icon');
            }
            if ($('.app-pd-list').hasClass('hor-list')) {
                $('.app-pd-list').removeClass('hor-list');
            } else {
                $('.app-pd-list').addClass('hor-list');
            }
        });

    }
    defaultClick() {
        this.props.defaultClick();
        this.setState({
            priceVal: '',
            redColor: '#666'
        })
    }
    volumeClick() {
        this.props.volumeClick('')
        this.setState({
            priceVal: '',
            redColor: '#666'
        })
    }
    priceClick() {
        this.setState({
            price: !this.state.price,
            redColor: '#FF3838'
        })
        this.state.priceVal = this.state.price ? 'asc' : 'desc';
        this.props.priceClick(this.state.priceVal)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.price == '') {
            this.setState({
                priceVal: '',
                redColor: '#666'
            })
        }
        if (nextProps.keyword != this.props.keyword) {
            this.setState({
                indexColor: '#FF3838'
            })
        }
    }
    render() {
        console.log(this.props.keyword);
        return (
            <div className="result-sort">
            <li className="cur" onClick={this.defaultClick.bind(this)} style={{'color':this.state.indexColor}}>综合</li>
        <li className="volume" onClick={this.volumeClick.bind(this)}>兑换排行</li>
        <li className={this.state.priceVal +' arrow price'} onClick={this.priceClick.bind(this)} style={{'color':this.state.redColor}}>香蕉</li>
            <li className="icons-list ver-icon"></li>
        </div>
        );
    }
}

export default ResultSort;