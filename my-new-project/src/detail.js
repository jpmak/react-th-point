require('styles/base.scss');
require('styles/jf.scss');

import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';

import TopNav from './components/TopNav';

import DetBody from './components/det/DetBody';

ReactDOM.render( < TopNav titleName = "产品详情"
	icon = "jf-record-icon"
	dis = "none" / > , document.getElementById('headnav'));

ReactDOM.render( < DetBody / > , document.getElementById('detwrap'));