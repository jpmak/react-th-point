require('styles/jf.scss');
require('styles/base.scss');
import 'core-js/fn/object/assign';
import React from 'react';
import {
	render
} from 'react-dom';
import {
	BrowserRouter as Router,
	hashHistory,
	Route
} from 'react-router-dom'
import R_det from './r_det';

import Searchhead from './containers/search/Redux_Searchhead';


// import App from './containers/App'

import reducer from './reducers/search'

import {
	createStore,
	applyMiddleware
} from 'redux'

import {
	Provider
} from 'react-redux'
import thunk from 'redux-thunk'

import {
	createLogger
} from 'redux-logger'

const middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
	middleware.push(createLogger())
}
const store = createStore(
		reducer,
		applyMiddleware(...middleware)
	)
	const R_Searchhead = () => (
		<Router history={hashHistory}>
	      <div>
	<Route exact  path="/r_search.html" component={Searchhead} />
	   <Route path="/r_search.html/R_det/:id" component={R_det}/>
	    </div>
	  </Router>
	);
	// ReactDOM.render( < Searchhead onName = ' on-focus ' / > );
	// ReactDOM.render( < R_Searchhead / > , document.getElementById('js-search-box'));
render(
	<Provider store={store}>
	<Searchhead/>
	</Provider>,
	document.getElementById('js-search-box')
)

// import Js_banner from './components/Js_banner';
// Render the main component into the dom
// ReactDOM.render( < Searchhead onName = ' on-focus ' / > , document.getElementById('js-search-box'));

// ReactDOM.render( < ResultWrap / > , document.getElementById('ResultWrap'));

//search页面