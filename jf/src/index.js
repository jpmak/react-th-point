import './styles/base.scss';
import './styles/jf.scss';
import 'core-js/fn/object/assign';

import React from 'react';
import {
	render
} from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'

import App from './containers/App';
import R_det from './containers/r_det';
import Searchhead from './containers/search/Redux_Searchhead';

import reducer from './reducers';

import {
	createStore,
	applyMiddleware
} from 'redux'

import {
	Provider
} from 'react-redux'
import thunk from 'redux-thunk'

// import {
// 	createLogger
// } from 'redux-logger'
const middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
	// middleware.push(createLogger())
	middleware

}
const store = createStore(
		reducer,
		applyMiddleware(...middleware)
	)
	// <Route exact path="/" component={Searchhead} />
	// <Route path="/R_det/:id" component={R_det}/>

const Jf = () => (

	<Router>
	<div>
	<Route exact path="/" component={App} />
	 <Route path="/product/:id" component={R_det}/>
	 	<Route path="/search/" component={Searchhead} />
	</div>
  </Router>
);



render(
	<Provider store={store}>
	<Jf/>
	</Provider>,
	document.getElementById('root')
)

// registerServiceWorker();