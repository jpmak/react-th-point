require('styles/swiper.min.css');


import React from 'react';

var SwiperBanner = React.createClass({
    render: function() {
        return (
            <div className="jf-floor-banner">
                <div className="swiper-container swiper1">
                    <div className="swiper-wrapper">

                    </div>
                    <div className="swiper-pagination swiper-pagination1"></div>
                </div>
            </div>
        );
    }
})

export default SwiperBanner;