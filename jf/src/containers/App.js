import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import {
	connect
} from 'react-redux'

import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
import $ from 'jquery';


import SearchBox from '../components/SearchBox';
import SlickBanner from '../components/SlickBanner';
import SalesWrapper from '../components/SalesWrapper';


import {
	beginRefresh
} from '../actions'

import {
	bindActionCreators
} from 'redux'



class App extends React.Component {


	constructor(props) {
		super(props);
		this.state = {

		};

	}



	componentWillMount() {


	}
	componentDidMount() {
		this.props.dispatch(beginRefresh())

	}

	componentWillReceiveProps(nextProps) {

	}

	tryRestoreComponent() {
		// this.props.dispatch(tryRestoreComponent())

	}

	beginRefresh() {}

	render() {
		// const value = this.state.value;
		// const _this = this;
		const {
			bannerItems,
			salesItems
		} = this.props
			// 
			//       <div id='search'>
			//     <SearchBox /> 
			//    </div>

		//    <div id='banner'>
		//    <SwiperBanner/>
		//    </div> 
		//    <div id='record'>
		//    <Record handhref = "exchangeLog.html"/>
		//    </div>
		//    <div id = 'js_banner' >
		//    <Js_banner/>
		//    </div>
		// <div id = 'SalesWrapper'>
		//    <SalesWrapper/>
		//    </div>
		//       <div id = 'Js_banner_2'>
		//    <js_banner_2/>
		//    </div>
		//    
		//      <TopNav titleName = "兑换商城"    icon = "jf-record-icon"
		// icon_link = "search.html" />
		return (
			<div className='w'>
	<header  id='search'>
	
			    <SearchBox /> 
			   </header>
			   <div id="AppBanner">
		<SlickBanner bannerItems={bannerItems}/>
		</div>

		<div className='jf-bsell-box'>
       <SalesWrapper salesItems={salesItems}/>
       </div>
            </div>

		);
	}
}



const mapStateToProps = state => {
	return {
		bannerItems: state.MsgAppReducer.bannerItems,
		salesItems: state.MsgAppReducer.salesItems



	}
}

function mapDispatchToProps(actions, dispatch) {
	return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps)(App)