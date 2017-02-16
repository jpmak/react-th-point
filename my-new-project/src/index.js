require('styles/base.css');

import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
// import AppComponent from './components/Main';
import TopNav from './components/TopNav';
import SwiperBanner from './components/SwiperBanner';

// Render the main component into the dom
ReactDOM.render(<TopNav />, document.getElementById('headnav'));
// ReactDOM.render(<AppComponent />, document.getElementById('app'));
// ReactDOM.render(<SwiperBanner />, document.getElementById('banner'));

ReactDOM.render(
	<SwiperBanner />,
	document.getElementById('banner')
);
// ReactDOM.render(<Banner />, document.getElementById('banner'));