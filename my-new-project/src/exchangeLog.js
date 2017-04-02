require('styles/base.scss');
require('styles/jf.scss');

import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import TopNav from './components/TopNav';


ReactDOM.render( < TopNav titleName = "兑换记录"
	icon = "jf-record-icon"
	dis = "none" / > , document.getElementById('headnav'));