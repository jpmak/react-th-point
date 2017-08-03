import {
  combineReducers
} from 'redux'
import {
  SEARCHPAGE_REDDIT,
  REQUESTPAGE_POSTS,
  RECEIVEPAGE_POSTS,
  INVALIDATE_REDDIT,
  MSG_LIST_PAGE_TRY_RESTORE_COMPONENT,
  MSG_LIST_PAGE_FETCH_ITEMS_SUCCESS,
  MSG_LIST_PAGE_FETCH_ITEMS_FAIL,
  MSG_LIST_PAGE_UPDATE_PULLDOWN_STATUS,
  MSG_LIST_PAGE_UPDATE_PULLUP_STATUS,
  MSG_LIST_PAGE_BACKUP_ISCROLL_Y,
  MSG_LIST_PAGE_KEYWORD,
  MSG_LIST_PAGE_UPDATE_LOADING_STATUS,
} from 'actions/search'

// 组件初始化状态，其实就是把component的constructor的挪到这里就完事了
const initState = {
  pageStatus: 0, //返回状态标识
  keyword: '',
  items: [], // 文章列表
  pullDownStatus: 3, // 下拉状态
  pullUpStatus: 6, // 上拉状态
  loadingStatus: 1, // 首屏加载状态
  page: 0,
  y: 0 // 上一次滚动偏移量
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
        nextState.pullUpStatus = 0;
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

    nextState.loadingStatus = 4;

    nextState.pullDownStatus = 6;
    nextState.pullUpStatus = 6;
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

// Reducer函数
// 1, 在redux初始化，路由切换等时机，都会被唤醒，从而有机会返回初始化state，
//    这将领先于componnent从而可以props传递
// 2, 这里redux框架传来的是state对应Reducer的子集合
export function MsgListPageReducer(state = initState, action) {
  switch (action.type) {
    case MSG_LIST_PAGE_TRY_RESTORE_COMPONENT:
      return MSG_LIST_PAGE_TRY_RESTORE_COMPONENT_reducer(state, action);
    case MSG_LIST_PAGE_FETCH_ITEMS_SUCCESS:
      return MSG_LIST_PAGE_FETCH_ITEMS_SUCCESS_reducer(state, action);
    case MSG_LIST_PAGE_FETCH_ITEMS_FAIL:
      return MSG_LIST_PAGE_FETCH_ITEMS_FAIL_reducer(state, action);
    case MSG_LIST_PAGE_UPDATE_PULLDOWN_STATUS:
      return MSG_LIST_PAGE_UPDATE_PULLDOWN_STATUS_reducer(state, action);
    case MSG_LIST_PAGE_UPDATE_PULLUP_STATUS:
      return MSG_LIST_PAGE_UPDATE_PULLUP_STATUS_reducer(state, action);
    case MSG_LIST_PAGE_BACKUP_ISCROLL_Y:
      return MSG_LIST_PAGE_BACKUP_ISCROLL_Y_reducer(state, action);
    case MSG_LIST_PAGE_KEYWORD:
      return MSG_LIST_PAGE_KEYWORD_reducer(state, action);
    case MSG_LIST_PAGE_UPDATE_LOADING_STATUS:
      return MSG_LIST_PAGE_UPDATE_LOADING_STATUS_reducer(state, action);
      // 有2类action.type会进入default
      // 1) 你不关心的action，属于其他组件
      // 2）系统的action，例如router切换了location，redux初始化了等等
    default:
      // console.log(action);
      return state; // 返回当前默认state或者当前state
  }
}
const searchPagedReddit = (state = 0, action) => {
  switch (action.type) {
    case SEARCHPAGE_REDDIT:
      return state + 1
    default:
      return state
  }
}

const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  is_items: [],
  statu: 0
}, action) => {
  switch (action.type) {
    case INVALIDATE_REDDIT:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUESTPAGE_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVEPAGE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        is_items: action.posts,
        status: action.status

      }
    default:
      return state
  }
}

const postsByReddit = (state = {}, action) => {
  switch (action.type) {
    case INVALIDATE_REDDIT:
    case RECEIVEPAGE_POSTS:
    case REQUESTPAGE_POSTS:
      return {
        ...state,
        [action.reddit]: posts(state[action.reddit], action)
      }
    default:
      return state
  }
}



const rootReducer = combineReducers({
  postsByReddit,
  searchPagedReddit,
  MsgListPageReducer
})

export default rootReducer