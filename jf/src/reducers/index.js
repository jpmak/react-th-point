import {
  combineReducers
} from 'redux'
import * as consts from "../consts/ActionTypes";

const initState = {
  bannerItems: [], // banner列表,
  bannerItems_2: [], // banner列表,
  salesItems: [], // 热卖列表,
  cateList: [] //分类列表

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
    default:
      return state; // 返回当前默认state或者当前state
  }
}

const rootReducer = combineReducers({
  MsgAppReducer
})
export default rootReducer