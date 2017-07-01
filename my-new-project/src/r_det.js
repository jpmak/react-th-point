require('styles/base.scss');
require('styles/jf.scss');

import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';

import TopNav from './components/TopNav';

import DetBody from './components/det/DetBody';

import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'



const R_det = () => (


	<div className="pdb120 th-block">
        <header id="headnav"><TopNav titleName = "产品详情"	icon = "jf-record-icon"	dis = "none" /></header>
<div id="detwrap"><DetBody /></div>
    </div>


)

export default R_det;