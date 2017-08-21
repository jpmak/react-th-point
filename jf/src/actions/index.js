    import $ from 'jquery';

    import * as consts from "../consts/ActionTypes";

    export function tryRestoreComponent() {
      return {
        type: consts.APP_RESTORE_COMPONENT
      };
    }


    // 发起刷新
    export function beginRefresh() {
      return (dispatch) => {

        // 异步网络请求
        fetchBanner(dispatch);
        fetchSalse(dispatch);
        fetchCateList(dispatch);

      }
    }

    const fetchBanner = (dispatch) => {

      $.ajax({
        url: '/wap/?g=WapSite&c=Exchange&a=get_index_Banner',
        type: 'POST',
        dataType: 'json',
        success: (data) => {
          dispatch({
            type: consts.FETCHBANNER_SUCCESS,
            bannerItems: data.bann_top.advList,
            bannerItems_2: data.bann_foo1.advList
          });

        },
        error: () => {
          console.log('加载失败');
        }
      });

    }

    const fetchSalse = (dispatch) => {
      fetch('/wap/?g=WapSite&c=Exchange&a=sales_volume', {
          method: 'POST',
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then((res) => res.json())
        .then((data) => {
          dispatch({
            type: consts.FETCHSALSE_SUCCESS,
            salesItems: data.goods_list
          });

        })
        .catch(function(e) {
          console.log("加载失败");
        });
    }


    const fetchCateList = (dispatch, getState) => {
      fetch('/wap/?g=WapSite&c=Exchange&a=get_cate_list', {
          method: 'POST',
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then((res) => res.json())
        .then((data) => {
          dispatch({
            type: consts.FETCHCATELIST_SUCCESS,
            cateList: data.cate_list,

          });

          fetchCateGoods(data.cate_list[0].cate_id, 0)(dispatch);
        })
        .catch(function(e) {
          console.log("加载失败");
        });
    }

    export const fetchCateGoods = (id, page) => {
      return (dispatch) => {
        fetch('/wap/?g=WapSite&c=Exchange&a=get_cate_goods', {
            method: 'POST',
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: 'cate_id=' + id + '&page=' + page
          })
          .then((res) => res.json())
          .then((data) => {
            dispatch({
              type: consts.FETCHCATEGOODS_SUCCESS,
              cateGoods: data.goods_list,
              pageStatus: data.status,

              CateGoodsPage: page
            });
          })
          .catch(function(e) {
            console.log("加载失败");
          });
      }
    }

    export const getCateId = (id) => {
      return (dispatch) => {
        dispatch({
          type: consts.UPDATE_CATEID_STATUS,
          cateId: id
        });
      };
    }
    export const pullUpStatus = (e) => {
      return (dispatch) => {
        dispatch({
          type: consts.UPDATE_PULLUP_STATUS,
          pullUpStatus: e
        });
      }
    }



    //////iscroll///////
    export function SearchTryRestoreComponent() {
      return {
        type: consts.MSG_LIST_PAGE_TRY_RESTORE_COMPONENT
      };
    }

    function _fetchItems(page, keyword, volume, price, dispatch) {
      setTimeout(() => { // 模拟延迟0.5秒
        $.ajax({
          url: '/wap/?g=WapSite&c=Exchange&a=search_goods',
          data: {
            page: page,
            keyword: keyword,
            volume: volume,
            by: price
          },
          type: 'POST',
          dataType: 'json',
          success: (data) => {

            dispatch({
              type: consts.MSG_LIST_PAGE_FETCH_ITEMS_SUCCESS,
              items: data.goods_list,
              page: page,
              pageStatus: data.status
            });

          },
          error: () => {
            dispatch({
              type: consts.MSG_LIST_PAGE_FETCH_ITEMS_FAIL,
              page: page
            });
          }
        });
      }, 500);
    }


    // 发起刷新
    export function SearchBeginRefresh() {
      return (dispatch, getState, volume, ) => {
        // 同步更新下拉状态
        dispatch({
          type: consts.MSG_LIST_PAGE_UPDATE_PULLDOWN_STATUS,
          nextPullDownStatus: 3
        });
        // 异步网络请求
        _fetchItems(0, getState().MsgListPageReducer.keyword, getState().MsgListPageReducer.volume, getState().MsgListPageReducer.price, dispatch);
      }
    }

    // 发起加载更多
    export function beginLoad() {
      return (dispatch, getState) => {
        // 同步更新下拉状态
        dispatch({
          type: consts.MSG_LIST_PAGE_UPDATE_PULLUP_STATUS,
          nextPullUpStatus: 2
        });
        // 异步网络请求
        _fetchItems(getState().MsgListPageReducer.page, getState().MsgListPageReducer.keyword, getState().MsgListPageReducer.volume, getState().MsgListPageReducer.price, dispatch);
      };
    }
    // 更新loading状态
    export function updateLoadingStatus(nextStatus) {
      return {
        type: consts.MSG_LIST_PAGE_UPDATE_LOADING_STATUS,
        nextStatus: nextStatus
      };
    }

    // 更新下拉状态
    export function updatePullDownStatus(nextPullDownStatus) {
      return {
        type: consts.MSG_LIST_PAGE_UPDATE_PULLDOWN_STATUS,
        nextPullDownStatus: nextPullDownStatus
      };
    }
    // 更新上拉状态
    export function updatePullUpStatus(nextPullUpStatus) {
      return {
        type: consts.MSG_LIST_PAGE_UPDATE_PULLUP_STATUS,
        nextPullUpStatus: nextPullUpStatus
      };
    }
    // 更新滚动条长度

    export function backupIScrollY(y) {
      return {
        type: consts.MSG_LIST_PAGE_BACKUP_ISCROLL_Y,
        y: y
      };
    }


    export function getKeyword(keyword) {
      return {
        type: consts.MSG_LIST_PAGE_KEYWORD,
        keyword: keyword
      };
    }
    export function volume(volume) {
      return {
        type: consts.MSG_LIST_PAGE_VOLUME,
        volume: volume
      };
    }
    export function price(price) {
      return {
        type: consts.MSG_LIST_PAGE_PRICE,
        price: price
      };
    }

    export function searchNum() {
      return {
        type: consts.MSG_LIST_UPDATE_SEARCHNUM
      };
    }

    //////iscrool///////