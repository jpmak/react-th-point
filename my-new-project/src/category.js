require('styles/base.scss');
require('styles/jf.scss');

import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';

// import SearchBox from './components/SearchBox';
import CateSearchBox from './components/category/CateSearchBox';
import ItemList from './components/category/ItemList';



// ReactDOM.render( < SearchBox / > , document.getElementById('search'));
ReactDOM.render( < CateSearchBox onName = ' on-focus ' / > , document.getElementById('js-search-box'));
ReactDOM.render( < ItemList / > , document.getElementById('js-list'));

// ReactDOM.render( < ResultWrap / > , document.getElementById('ResultWrap'));

//search页面