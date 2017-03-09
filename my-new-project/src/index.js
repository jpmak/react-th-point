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
	Js_banner,
	Js_banner_2
} from './components/SwiperBanner';
import Record from './components/Record';
import SalesWrapper from './components/SalesWrapper';
import {
	App,
	JsCate,
	JsPrduct
} from './components/JsCate';


import Searchhead from './components/search/Searchhead';
// import Js_banner from './components/Js_banner';
// Render the main component into the dom
// 
ReactDOM.render( < Searchhead / > , document.getElementById('js-search-box'));
ReactDOM.render( < TopNav titleName = "兑换商城"
	icon = "jf-record-icon"
	icon_link = "search.html" / > , document.getElementById('headnav'));
// ReactDOM.render(<AppComponent />, document.getElementById('app'));
// ReactDOM.render(<SwiperBanner />, document.getElementById('banner'));
ReactDOM.render( < SearchBox / > , document.getElementById('search'));
ReactDOM.render( < SwiperBanner / > , document.getElementById('banner'));
ReactDOM.render( < Record handhref = "Exchange-exchangeLog.html" / > , document.getElementById('record'));
ReactDOM.render( < Js_banner / > , document.getElementById('js_banner'));
ReactDOM.render( < SalesWrapper / > , document.getElementById('SalesWrapper'));
ReactDOM.render( < Js_banner_2 / > , document.getElementById('js_banner_2'));
ReactDOM.render( < App / > , document.getElementById('app'));

// ReactDOM.render( < JsCate / > , document.getElementById('jd-cate'));
// ReactDOM.render( < JsPrduct / > , document.getElementById('jd-prduct'));



//search页面