import React from 'react';
import {
	connect
} from 'react-redux'
import TopNav from '../components/TopNav';
import SearchBox from '../components/SearchBox';
import SlickBanner from '../components/SlickBanner';
import SlickBanner2 from '../components/SlickBanner2';
import SalesWrapper from '../components/SalesWrapper';
import JsCate from '../components/JsCate';
import FooterNav from '../components/FooterNav';
import {
	tryRestoreComponent,
	beginRefresh,
	fetchCateGoods,
	getCateId,
	pullUpStatus,
} from '../actions'
import {

	updateLoadingStatus,

} from '../actions/search'

// import {
// 	bindActionCreators
// } from 'redux'

class App extends React.Component {
	componentWillMount() {
		this.props.dispatch(updateLoadingStatus(1));
		this.props.dispatch(tryRestoreComponent());
	}
	componentDidMount() {
		if (this.props.loadingStatus === 1) {
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
		if (this.props.pullUpStatus !== 0) {
			this.props.dispatch(fetchCateGoods(this.props.cateId, this.props.CateGoodsPage))
		}
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


			pageStatus
		} = this.props
		return (

			<div id='AppWrap'>
		<div id='scrollwrap'>
		<header id="headnav" >
		<TopNav titleName = "兑换商城"	icon = "jf-record-icon" icon_link = "search.html" />
		</header>
		<div id='search'>
		<SearchBox loadingStatus={this.props.loadingStatus} parmKeyword={this.props.match.params.keyword} history={this.props.history} />
		</div>
		<div className='w pushHide'>

		<div id="AppBanner">
		<SlickBanner bannerItems={bannerItems}/>
		</div>
		<div className='jf-bsell-box'>
        <SalesWrapper salesItems={salesItems}/>
        </div>
  		<div id="AppBanner_2">
		<SlickBanner2 bannerItems_2={bannerItems_2}/>
		</div>
		</div>
		</div>
			<div className='w pushHide'>
		<JsCate cateList={cateList} cateGoods={cateGoods} pageStatus={pageStatus} pullDownStatus={pullDownStatus} pullUpStatus={pullUpStatus} UpDataPullUpStatus={this.UpDataPullUpStatus.bind(this)} get_cate_goods={this.get_cate_goods.bind(this)} changeGoods={this.changeGoods.bind(this)} />

            </div>
		<footer id='nav ' className='pushHide'>
            <FooterNav/>
            </footer>
</div>
		);
	}
}



const mapStateToProps = state => {
	return {
		searchLoadingStatus: state.MsgListPageReducer.loadingStatus,
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

// function mapDispatchToProps(actions, dispatch) {
// 	return bindActionCreators(actions, dispatch);
// }
export default connect(mapStateToProps)(App)