import * as consts from "../consts/ActionTypes";
// 组件初始化状态，其实就是把component的constructor的挪到这里就完事了
const listInitState = {
  listLoadingStatus: 1, // [1]首屏加载状态 [2]非首次进去 [3]加载失败 [4]没有数据放回首页
  navStatus: 1,
  navItems: [], // 导航列表
  GoodItems: [] // 列表内容


};

const LIST_RESTORE_COMPONENT_reducer = (state, action) => {
  // 计算一下
  return state;
}

const LIST_NAV_SUCCESS_reducer = (state, action) => {
  let nextState = Object.assign({}, state);
  nextState.navStatus = action.navStatus;
  nextState.loadingStatus = 2;
  if (action.navStatus) {
    nextState.navItems = action.navItems;
  } else {
    nextState.loadingStatus = 4;
  }
  return nextState;
}

const LIST_GOODS_SUCCESS_reducer = (state, action) => {
  return state;
}

const LIST_NAV_FAIL_reducer = (state, action) => {
  // 首屏加载失败, 那么需要展示loading fail效果
  if (state.loadingStatus === 1) {
    return Object.assign({}, state, {
      loadingStatus: 3
    });
  }
  // 首屏加载成功, 刷新或者加载操作异常

  return state;
}

const LIST_UPDATE_LOADING_STATUS_reducer = (state, action) => {
  if (state.loadingStatus !== action.loadingStatus) {
    return Object.assign({}, state, {
      listLoadingStatus: action.nextStatus
    });
  }
  return state;
}


export const MsgListReducer = (state = listInitState, action) => {
  switch (action.type) {
    case consts.LIST_RESTORE_COMPONENT:
      return LIST_RESTORE_COMPONENT_reducer(state, action);
    case consts.LIST_NAV_SUCCESS:
      return LIST_NAV_SUCCESS_reducer(state, action);
    case consts.LIST_NAV_FAIL:
      return LIST_NAV_FAIL_reducer(state, action);
    case consts.LIST_GOODS_SUCCESS:
      return LIST_GOODS_SUCCESS_reducer(state, action);
    case consts.LIST_UPDATE_LOADING_STATUS:
      return LIST_UPDATE_LOADING_STATUS_reducer(state, action);
      // 有2类action.type会进入default
      // 1) 你不关心的action，属于其他组件
      // 2）系统的action，例如router切换了location，redux初始化了等等
    default:
      // console.log(action);
      return state; // 返回当前默认state或者当前state
  }
}



export default MsgListReducer