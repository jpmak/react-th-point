require('styles/swiper.min.css');
// require('styles/jf.css');

import React from 'react';

var SwiperBanner = React.createClass({
	render: function() {
		return (
			<div className="jf-floor-banner">
                <div className="swiper-container swiper1">
                    <div className="swiper-wrapper">
123
                    </div>
                    <div className="swiper-pagination swiper-pagination1"></div>
                </div>
            </div>
		);
	}
})

// ReactDOM.render(
// 	<SwiperBanner />,
// 	document.getElementById('banner')
// );

// SwiperBanner.defaultProps = {};


export default SwiperBanner;

// var SwiperBanner = React.createClass({

// class SwiperBanner extends React.Component {
// 	render() {
// 		return (

// 			<div className="jf-floor-banner">
//                 <div className="swiper-container swiper1">
//                     <div className="swiper-wrapper">
// 123
//                     </div>
//                     <div className="swiper-pagination swiper-pagination1"></div>
//                 </div>
//             </div>
// 		);
// 	}
// }


// SwiperBanner.defaultProps = {};

// export default SwiperBanner;