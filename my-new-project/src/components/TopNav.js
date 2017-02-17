// require('styles/h_tit.scss');
require('styles/jf.scss');
import React from 'react';

var TopNav = React.createClass({
	render: function() {
		return (
			<div className="th-nav wbox ">
            <div className="th-nav-back">
                <a className="javascript:location='Index-index.html';">返回</a>
            </div>
            <div className="th-nav-title of bg">{this.props.titleName}</div>
            <div className="th-nav-right tr">
            <a className={this.props.icon} href={this.props.icon_link}> </a>
               {/*  <a className="jf-record-icon" href=""> </a>*/}
            </div>
        </div>
		);
	}
})


export default TopNav;