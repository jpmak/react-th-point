import {
  combineReducers
} from 'redux'
import * as consts from "../consts/ActionTypes";

const initState = {
  pageStatus: 1, //返回状态标识
  bannerItems: [], // banner列表,
  bannerItems_2: [], // banner列表,
  salesItems: [], // 热卖列表,
  cateList: [], //分类列表
  cateGoods: [], //分类信息
  CateGoodsPage: 0, //页数
  pullUpStatus: 0 //分类信息的加载状态


};


function MSG_APP_RESTORE_COMPONENT_reducer(state, action) {
  // 计算一下
  return state;
}

function FETCHBANNER_SUCCESS_reducer(state, action) {
  return Object.assign({}, state, {
    bannerItems: action.bannerItems,
    bannerItems_2: action.bannerItems_2

  });
  return state;
}


function FETCHSALSE_SUCCESS_reducer(state, action) {
  return Object.assign({}, state, {
    salesItems: action.salesItems
  });
  return state;
}

function FETCHCATELIST_SUCCESS_reducer(state, action) {
  return Object.assign({}, state, {
    cateList: action.cateList

  });
  return state;
}

function FETCHCATEGOODS_SUCCESS_reducer(state, action) {
  // return Object.assign({}, state, {
  //   cateGoods: action.cateGoods
  // });
  // return state;
  let nextState = Object.assign({}, state);
  nextState.pageStatus = action.pageStatus;

  if (action.pageStatus) {
    console.log(action.CateGoodsPage);

    if (action.CateGoodsPage == 0) { // 刷新操作
      nextState.cateGoods = action.cateGoods;
      nextState.CateGoodsPage = action.CateGoodsPage + 1;
      if (action.cateGoods.length < 10) {
        nextState.pullUpStatus = 1;
      }

    } else { // 加载操作
      if (state.pullUpStatus == 0) {

        nextState.cateGoods = state.cateGoods.concat(action.cateGoods);

        nextState.CateGoodsPage = action.CateGoodsPage + 1;
      }
    }
  } else if (action.CateGoodsPage == 0) {
    nextState.cateGoods = 0;
    nextState.pullUpStatus = 4;

  } else if (action.CateGoodsPage > 0 && state.pullUpStatus == 1) {
    nextState.pullUpStatus = 2;

  }
  return nextState;
}



export function MsgAppReducer(state = initState, action) {
  switch (action.type) {
    case consts.MSG_APP_RESTORE_COMPONENT:
      return MSG_APP_RESTORE_COMPONENT_reducer(state, action);

    case consts.FETCHBANNER_SUCCESS:
      return FETCHBANNER_SUCCESS_reducer(state, action);
    case consts.FETCHSALSE_SUCCESS:
      return FETCHSALSE_SUCCESS_reducer(state, action);
    case consts.FETCHCATELIST_SUCCESS:
      return FETCHCATELIST_SUCCESS_reducer(state, action);
    case consts.FETCHCATEGOODS_SUCCESS:
      return FETCHCATEGOODS_SUCCESS_reducer(state, action);
    default:
      return state; // 返回当前默认state或者当前state
  }
}

const rootReducer = combineReducers({
  MsgAppReducer
})
export default rootReducer