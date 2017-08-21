import {
  combineReducers
} from 'redux'
import * as consts from "../consts/ActionTypes";
// import MsgListPageReducer from "./search";


const initState = {
  loadingStatus: 1, // 首屏加载状态
  pageStatus: 1, //返回状态标识
  bannerItems: [], // banner列表,
  bannerItems_2: [], // banner列表,
  salesItems: [], // 热卖列表,
  cateList: [], //分类列表
  cateId: 0, //当前分类ID
  cateGoods: [], //分类信息
  CateGoodsPage: 0, //页数
  pullUpStatus: 0, //上加载状态
  pullDownStatus: 4 //下加载状态


};


function APP_RESTORE_COMPONENT_reducer(state, action) {
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

function UPDATE_CATEID_STATUS_reducer(state, action) {
  return Object.assign({}, state, {
    // type: UPDATE_CATEID_STATUS,
    cateId: action.cateId
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

function UPDATE_PULLUP_STATUS_reducer(state, action) {
  return Object.assign({}, state, {
    pullUpStatus: action.pullUpStatus
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
  nextState.pullUpStatus = 2;
  nextState.loadingStatus = 2;
  if (action.pageStatus) {
    if (action.CateGoodsPage == 0) { // 刷新操作
      nextState.cateGoods = action.cateGoods;
      nextState.CateGoodsPage = action.CateGoodsPage + 1;
      if (action.cateGoods.length < 4) {
        nextState.pullDownStatus = 1;
      } else {
        nextState.pullDownStatus = 0;

      }

    } else { // 加载操作
      if (state.pullDownStatus == 0) {
        if (action.cateGoods.length < 4) {
          nextState.pullDownStatus = 1;
        }
        nextState.cateGoods = state.cateGoods.concat(action.cateGoods);

        nextState.CateGoodsPage = action.CateGoodsPage + 1;
      }
    }
  } else if (action.CateGoodsPage == 0) {
    nextState.cateGoods = 0;
    nextState.pullDownStatus = 4;
  } else if (action.CateGoodsPage > 0 && state.pullDownStatus == 0 || state.pullDownStatus == 1) {
    nextState.pullDownStatus = 2;

  }
  return nextState;
}



export function MsgAppReducer(state = initState, action) {
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


    default:
      return state; // 返回当前默认state或者当前state
  }
}

// 组件初始化状态，其实就是把component的constructor的挪到这里就完事了
const searchInitState = {
  pageStatus: 0, //返回状态标识
  keyword: '', //关键词
  volume: '', //排行
  price: '', //积分次序 desc asc
  items: [], // 文章列表
  pullDownStatus: 3, // 下拉状态
  pullUpStatus: 6, // 上拉状态
  loadingStatus: 1, // 首屏加载状态
  page: 0,
  y: 0, // 上一次滚动偏移量
  searchNum: 0 // //搜索次数
};

function MSG_LIST_PAGE_TRY_RESTORE_COMPONENT_reducer(state, action) {
  // 计算一下
  return state;
}

function MSG_LIST_PAGE_FETCH_ITEMS_SUCCESS_reducer(state, action) {
  let nextState = Object.assign({}, state);
  nextState.pageStatus = action.pageStatus;
  if (action.pageStatus) {
    if (action.page == 0) { // 刷新操作

      if (state.pullDownStatus == 3) {
        nextState.pullDownStatus = 4;
        nextState.items = action.items;
        nextState.loadingStatus = 2;
        nextState.page = action.page + 1;
        if (action.items.length == 10) {
          nextState.pullUpStatus = 0;
        } else {
          nextState.pullUpStatus = 7;
        }
      }

    } else { // 加载操作
      if (state.pullUpStatus == 2) {
        nextState.pullUpStatus = 0;
        nextState.items = state.items.concat(action.items);
        // nextState.pageState = action.status;

        nextState.page = action.page + 1;
      }
    }
  } else if (action.page == 0) {
    nextState.items = 0;
    // nextState.loadingStatus = 4;
    // nextState.items = '';
    nextState.loadingStatus = 2;

    nextState.pullDownStatus = 6;
    nextState.pullUpStatus = 8;
    nextState.liHtmlStatus = 0;

  } else if (action.page > 0) {
    nextState.pullUpStatus = 4;

  }
  return nextState;
}

function MSG_LIST_PAGE_FETCH_ITEMS_FAIL_reducer(state, action) {
  // 首屏加载失败, 那么需要展示loading fail效果
  if (state.loadingStatus == 1) {
    return Object.assign({}, state, {
      loadingStatus: 3
    });
  }
  // 首屏加载成功, 刷新或者加载操作异常
  if (state.loadingStatus == 2) {
    if (action.page == 1) { // 刷新操作
      if (state.pullDownStatus == 3) {
        return Object.assign({}, state, {
          pullDownStatus: 5,
          is_items: state.items.slice(0)
        });
      }
    } else { // 加载操作
      if (state.pullUpStatus == 2) {
        return Object.assign({}, state, {
          pullUpStatus: 4
        });
      }
    }
  }
  return state;
}

function MSG_LIST_PAGE_UPDATE_LOADING_STATUS_reducer(state, action) {
  if (state.loadingStatus != action.loadingStatus) {
    return Object.assign({}, state, {
      loadingStatus: action.nextStatus
    });
  }
  return state;
}

function MSG_LIST_PAGE_UPDATE_PULLDOWN_STATUS_reducer(state, action) {
  if (state.pullDownStatus != action.nextPullDownStatus) {
    return Object.assign({}, state, {
      pullDownStatus: action.nextPullDownStatus
    });
  }
  return state;
}

function MSG_LIST_PAGE_UPDATE_PULLUP_STATUS_reducer(state, action) {
  if (state.pullUpStatus != action.nextPullUpStatus) {
    return Object.assign({}, state, {
      pullUpStatus: action.nextPullUpStatus
    });
  }
  return state;
}

function MSG_LIST_UPDATE_SEARCHNUM_reducer(state, action) {
  console.log(action.searchNum + 1)

  return Object.assign({}, state, {
    searchNum: state.searchNum + 1
  });
  return state;
}

function MSG_LIST_PAGE_BACKUP_ISCROLL_Y_reducer(state, action) {
  return Object.assign({}, state, {
    y: action.y
  });
}

function MSG_LIST_PAGE_KEYWORD_reducer(state, action) {
  return Object.assign({}, state, {
    keyword: action.keyword
  });
}

function MSG_LIST_PAGE_VOLUME_reducer(state, action) {
  return Object.assign({}, state, {
    volume: action.volume
  });
}


function MSG_LIST_PAGE_PRICE_reducer(state, action) {
  return Object.assign({}, state, {
    price: action.price
  });
}

// Reducer函数
// 1, 在redux初始化，路由切换等时机，都会被唤醒，从而有机会返回初始化state，
//    这将领先于componnent从而可以props传递
// 2, 这里redux框架传来的是state对应Reducer的子集合
export function MsgListPageReducer(state = searchInitState, action) {
  switch (action.type) {
    case consts.MSG_LIST_PAGE_TRY_RESTORE_COMPONENT:
      return MSG_LIST_PAGE_TRY_RESTORE_COMPONENT_reducer(state, action);
    case consts.MSG_LIST_PAGE_FETCH_ITEMS_SUCCESS:
      return MSG_LIST_PAGE_FETCH_ITEMS_SUCCESS_reducer(state, action);
    case consts.MSG_LIST_PAGE_FETCH_ITEMS_FAIL:
      return MSG_LIST_PAGE_FETCH_ITEMS_FAIL_reducer(state, action);
    case consts.MSG_LIST_PAGE_UPDATE_PULLDOWN_STATUS:
      return MSG_LIST_PAGE_UPDATE_PULLDOWN_STATUS_reducer(state, action);
    case consts.MSG_LIST_PAGE_UPDATE_PULLUP_STATUS:
      return MSG_LIST_PAGE_UPDATE_PULLUP_STATUS_reducer(state, action);
    case consts.MSG_LIST_PAGE_BACKUP_ISCROLL_Y:
      return MSG_LIST_PAGE_BACKUP_ISCROLL_Y_reducer(state, action);
    case consts.MSG_LIST_PAGE_KEYWORD:
      return MSG_LIST_PAGE_KEYWORD_reducer(state, action);
    case consts.MSG_LIST_PAGE_VOLUME:
      return MSG_LIST_PAGE_VOLUME_reducer(state, action);
    case consts.MSG_LIST_PAGE_PRICE:
      return MSG_LIST_PAGE_PRICE_reducer(state, action);
    case consts.MSG_LIST_UPDATE_SEARCHNUM:
      return MSG_LIST_UPDATE_SEARCHNUM_reducer(state, action);
    case consts.MSG_LIST_PAGE_UPDATE_LOADING_STATUS:
      return MSG_LIST_PAGE_UPDATE_LOADING_STATUS_reducer(state, action);
      // 有2类action.type会进入default
      // 1) 你不关心的action，属于其他组件
      // 2）系统的action，例如router切换了location，redux初始化了等等
    default:
      // console.log(action);
      return state; // 返回当前默认state或者当前state
  }
}



const rootReducer = combineReducers({
  MsgAppReducer,
  MsgListPageReducer
})
export default rootReducer