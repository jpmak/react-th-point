require('styles/base.scss');
require('styles/jf.scss');

import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';

import {
	Searchhead,
	ResultWrap
} from './components/search/Searchhead';

import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'



const R_search = () => (


	<div>
            <div id="js-search-box"><Searchhead/></div>
         <div id="ResultWrap"></div>
    </div>


)

export default R_search;