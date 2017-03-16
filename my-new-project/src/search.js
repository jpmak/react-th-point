require('styles/base.scss');
require('styles/jf.scss');

import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';


import {
	Searchhead,
	ResultWrap
} from './components/search/Searchhead';

// import Js_banner from './components/Js_banner';
// Render the main component into the dom
ReactDOM.render( < Searchhead onName = ' on-focus ' / > , document.getElementById('js-search-box'));

// ReactDOM.render( < ResultWrap / > , document.getElementById('ResultWrap'));

//search页面