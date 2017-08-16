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
import SlickBanner_2 from '../components/SlickBanner_2';
import SalesWrapper from '../components/SalesWrapper';
import JsCate from '../components/JsCate';
import {
	beginRefresh
} from '../actions'
import {
	bindActionCreators
} from 'redux'

class App extends React.Component {
	componentWillMount() {}
	componentDidMount() {
		this.props.dispatch(beginRefresh())
	}
	componentWillReceiveProps(nextProps) {}
	tryRestoreComponent() {
		// this.props.dispatch(tryRestoreComponent())
	}
	beginRefresh() {}
	render() {
		const {
			bannerItems,
			bannerItems_2,
			salesItems,
			cateList,
			cateGoods
		} = this.props
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
  			   <div id="AppBanner_2">
		<SlickBanner_2 bannerItems_2={bannerItems_2}/>
		</div>
	<JsCate cateList={cateList} cateGoods={cateGoods}/>
            </div>

		);
	}
}



const mapStateToProps = state => {
	return {
		bannerItems: state.MsgAppReducer.bannerItems,
		bannerItems_2: state.MsgAppReducer.bannerItems_2,
		cateList: state.MsgAppReducer.cateList,
		salesItems: state.MsgAppReducer.salesItems,
		cateGoods: state.MsgAppReducer.cateGoods



	}
}

function mapDispatchToProps(actions, dispatch) {
	return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps)(App)