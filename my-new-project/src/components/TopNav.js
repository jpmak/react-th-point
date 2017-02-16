// require('styles/h_tit.scss');

import React from 'react';

var TopNav = React.createClass({
	render: function() {
		return (
			<div className="th-nav wbox ">
            <div className="th-nav-back">
                <a className="javascript:location='Index-index.html';">返回</a>
            </div>
            <div className="th-nav-title of bg">22</div>
            <div className="th-nav-right tr">
                <a className="jf-record-icon" href="Exchange-orderList.html">
                </a>
            </div>
        </div>
		);
	}
})


export default TopNav;