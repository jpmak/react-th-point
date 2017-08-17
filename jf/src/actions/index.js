    import $ from 'jquery';

    import * as consts from "../consts/ActionTypes";


    // 发起刷新
    export function beginRefresh() {
      return (dispatch) => {
        // 同步更新下拉状态
        dispatch({
          type: consts.MSG_APP_RESTORE_COMPONENT
        });
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