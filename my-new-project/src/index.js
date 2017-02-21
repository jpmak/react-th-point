require('styles/base.scss');
require('styles/jf.scss');

import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
// import AppComponent from './components/Main';
import TopNav from './components/TopNav';
import SearchBox from './components/SearchBox';
import {
	SwiperBanner,
	Js_banner
} from './components/SwiperBanner';
import Record from './components/Record';
import SalesWrapper from './components/SalesWrapper';
// import Js_banner from './components/Js_banner';
// Render the main component into the dom
ReactDOM.render( < TopNav titleName = "兑换商城"
	icon = "jf-record-icon"
	icon_link = "Exchange-orderList.html" / > , document.getElementById('headnav'));
// ReactDOM.render(<AppComponent />, document.getElementById('app'));
// ReactDOM.render(<SwiperBanner />, document.getElementById('banner'));
ReactDOM.render( < SearchBox / > , document.getElementById('search'));
ReactDOM.render( < SwiperBanner / > , document.getElementById('banner'));
ReactDOM.render( < Record source = "/json/user_info.json"
	handhref = "Exchange-exchangeLog.html" / > , document.getElementById('record'));
ReactDOM.render( < Js_banner / > , document.getElementById('js_banner'));
ReactDOM.render( < SalesWrapper / > , document.getElementById('SalesWrapper'));