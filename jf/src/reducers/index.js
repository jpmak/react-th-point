import {
  combineReducers
} from 'redux'
import * as consts from "../consts/ActionTypes";
import MsgListPageReducer from "./search.js";
import MsgListReducer from "./list.js";
import MsgDetailReducer from "./detail.js";




const initState = {
  loadingStatus: 1, // 首屏加载状态
  pageStatus: 1, //返回状态标识
  bannerItems: [], // banner列表,
  bannerItems_2: [], // banner列表,
  salesItems: [], // 热卖列表,
  cateList: [], //分类列表
  pushIndex: 0, //点击的index
  cateId: '', //当前分类ID
  cateGoods: [], //分类信息
  CateGoodsPage: 0, //页数
  pullUpStatus: 0, //上加载状态
  pullDownStatus: 4, //下加载状态
  moveWidths: 0, //块状移动长度
  liWidth: 0 //块状长度


};

const APP_RESTORE_COMPONENT_reducer = (state, action) => {
  // 计算一下
  return state;
}

const FETCHBANNER_SUCCESS_reducer = (state, action) => {
  return Object.assign({}, state, {
    bannerItems: action.bannerItems,
    bannerItems_2: action.bannerItems_2
  });
  return state;
}

const UPDATE_CATEID_STATUS_reducer = (state, action) => {
  return Object.assign({}, state, {
    cateId: action.cateId
  });
  return state;
}

const FETCHSALSE_SUCCESS_reducer = (state, action) => {
  return Object.assign({}, state, {
    salesItems: action.salesItems
  });
  return state;
}

const FETCHCATELIST_SUCCESS_reducer = (state, action) => {
  return Object.assign({}, state, {
    cateList: action.cateList

  });
  return state;
}

const UPDATE_PULLUP_STATUS_reducer = (state, action) => {
  return Object.assign({}, state, {
    pullUpStatus: action.pullUpStatus
  });
  return state;
}


const UPDATE_LIEVENT_STATUS_reducer = (state, action) => {
  return Object.assign({}, state, {
    moveWidths: action.moveWidths,
    liWidth: action.liWidth,
    pushIndex: action.pushIndex
  });
  return state;
}

const FETCHCATEGOODS_SUCCESS_reducer = (state, action) => {
  let nextState = Object.assign({}, state);
  nextState.pageStatus = action.pageStatus;

  nextState.pullUpStatus = 2;
  nextState.loadingStatus = 2;

  if (action.pageStatus) {
    if (action.CateGoodsPage === 0) { // 刷新操作
      nextState.cateGoods = action.cateGoods;
      nextState.CateGoodsPage = action.CateGoodsPage + 1;
      if (action.cateGoods.length < 4) {
        nextState.pullDownStatus = 1;
      } else {
        nextState.pullDownStatus = 0;

      }

    } else { // 加载操作
      if (state.pullDownStatus === 0) {
        if (action.cateGoods.length < 4) {
          nextState.pullDownStatus = 1;
        }
        nextState.cateGoods = state.cateGoods.concat(action.cateGoods);

        nextState.CateGoodsPage = action.CateGoodsPage + 1;
      }
    }
  } else {
    if (action.CateGoodsPage === 0) {
      nextState.cateGoods = [];
      nextState.pullDownStatus = 4;
    }
    if (action.CateGoodsPage > 0 && state.pullDownStatus < 2) {
      nextState.pullDownStatus = 2;

    }
  }
  return nextState;
}



export const MsgAppReducer = (state = initState, action) => {
  switch (action.type) {
    case consts.APP_RESTORE_COMPONENT:
      return APP_RESTORE_COMPONENT_reducer(state, action);
    case consts.UPDATE_CATEID_STATUS:
      return UPDATE_CATEID_STATUS_reducer(state, action);
    case consts.FETCHBANNER_SUCCESS:
      return FETCHBANNER_SUCCESS_reducer(state, action);
    case consts.FETCHSALSE_SUCCESS:
      return FETCHSALSE_SUCCESS_reducer(state, action);
    case consts.FETCHCATELIST_SUCCESS:
      return FETCHCATELIST_SUCCESS_reducer(state, action);
    case consts.FETCHCATEGOODS_SUCCESS:
      return FETCHCATEGOODS_SUCCESS_reducer(state, action);
    case consts.UPDATE_PULLUP_STATUS:
      return UPDATE_PULLUP_STATUS_reducer(state, action);
    case consts.UPDATE_LIEVENT_STATUS:
      return UPDATE_LIEVENT_STATUS_reducer(state, action);

    default:
      return state; // 返回当前默认state或者当前state
  }
}



const rootReducer = combineReducers({
  MsgAppReducer,
  MsgListPageReducer,
  MsgListReducer,
  MsgDetailReducer,

})
export default rootReducer