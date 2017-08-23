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
import TopNav from '../components/TopNav';
import SearchBox from '../components/SearchBox';
import SlickBanner from '../components/SlickBanner';
import SlickBanner_2 from '../components/SlickBanner_2';
import SalesWrapper from '../components/SalesWrapper';
import JsCate from '../components/JsCate';
import FooterNav from '../components/FooterNav';

import {
	loadingStatus,
	tryRestoreComponent,
	beginRefresh,
	fetchCateGoods,
	getCateId,
	pullUpStatus
} from '../actions'
import {
	bindActionCreators
} from 'redux'

class App extends React.Component {
	componentWillMount() {
		this.props.dispatch(tryRestoreComponent());
	}
	componentDidMount() {
		if (this.props.loadingStatus == 1) {
			this.props.dispatch(beginRefresh())
		}
	}
	componentWillReceiveProps(nextProps) {}
	tryRestoreComponent() {
		// this.props.dispatch(tryRestoreComponent())
	}

	get_cate_goods(id, page) {
		this.props.dispatch(getCateId(id))
		this.props.dispatch(fetchCateGoods(id, page))
	}
	changeGoods(e, page) {
		this.props.dispatch(fetchCateGoods(this.props.cateId, this.props.CateGoodsPage))
	}
	UpDataPullUpStatus(e) {
		this.props.dispatch(pullUpStatus(e))
	}
	render() {
		const {
			bannerItems,
			bannerItems_2,
			salesItems,
			cateList,
			cateGoods,
			pullUpStatus,
			pullDownStatus,
			cateId,
			CateGoodsPage,
			pageStatus
		} = this.props
		return (
			<div>
		<div id='scrollwrap'>
		<header id="headnav">
		<TopNav titleName = "兑换商城"	icon = "jf-record-icon" icon_link = "search.html" />
		</header>
		<div id='search'>
		<SearchBox/>
		</div>
		<div className='w'>

		<div id="AppBanner">
		<SlickBanner bannerItems={bannerItems}/>
		</div>
		<div className='jf-bsell-box'>
        <SalesWrapper salesItems={salesItems}/>
        </div>
  		<div id="AppBanner_2">
		<SlickBanner_2 bannerItems_2={bannerItems_2}/>
		</div>
		</div>
		</div>
			<div className='w'>
	<JsCate cateList={cateList} cateGoods={cateGoods} pageStatus={pageStatus} pullDownStatus={pullDownStatus} pullUpStatus={pullUpStatus} UpDataPullUpStatus={this.UpDataPullUpStatus.bind(this)} get_cate_goods={this.get_cate_goods.bind(this)} changeGoods={this.changeGoods.bind(this)} />

            </div>
            <footer id='nav'>
            <FooterNav/>
            </footer>
</div>
		);
	}
}



const mapStateToProps = state => {
	return {
		loadingStatus: state.MsgAppReducer.loadingStatus,
		bannerItems: state.MsgAppReducer.bannerItems,
		bannerItems_2: state.MsgAppReducer.bannerItems_2,
		cateList: state.MsgAppReducer.cateList,
		salesItems: state.MsgAppReducer.salesItems,
		cateGoods: state.MsgAppReducer.cateGoods,
		cateId: state.MsgAppReducer.cateId,
		pullUpStatus: state.MsgAppReducer.pullUpStatus,
		pullDownStatus: state.MsgAppReducer.pullDownStatus,
		pageStatus: state.MsgAppReducer.pageStatus,
		CateGoodsPage: state.MsgAppReducer.CateGoodsPage,
	}
}

function mapDispatchToProps(actions, dispatch) {
	return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps)(App)