import React from 'react';
import $ from 'jquery';

class ResultSort extends React.Component {
    componentDidMount() {
        const _this = this;

        $('.result-sort li').not('.icons-list').on('click', function() {
            var liindex = $('.result-sort li').index(this);
            $(this).addClass('cur').siblings().removeClass('cur');
            if (liindex == 0) {
                price = '';

            }
            if (liindex == 1) {
                price = 'desc';

            }
            if (liindex == 2) {
                if ($('.result-sort li.arrow').hasClass('asc') || price == 'asc') {
                    $('.result-sort li.arrow').removeClass('asc').addClass('desc');
                    price = 'desc';
                } else {
                    $('.result-sort li.arrow').removeClass('desc').addClass('asc');
                    price = 'asc';
                }
            }
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
    render() {
        return (

            <div className="result-sort">
            <li className="cur">综合</li>
        <li className="volume">兑换排行</li>
            <li className="arrow price">香蕉</li>
            <li className="icons-list ver-icon"></li>
        </div>

        );
    }
}

export default ResultSort;