    import * as consts from "../consts/ActionTypes";
    export function ListTryRestoreComponent() {
      return {
        type: consts.LIST_RESTORE_COMPONENT
      };
    }

    // 发起刷新
    export function beginRefresh() {
      return (dispatch) => {
        fetchListNav(dispatch);
      }
    }

    const fetchListNav = (dispatch) => {
      fetch('/wap/?g=WapSite&c=Exchange&a=get_cate_list', {
          method: 'POST',
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then((res) => res.json())
        .then((data) => {
          dispatch({
            type: consts.LIST_NAV_SUCCESS,
            navStatus: data.status,
            navItems: data.cate_list,

          });

          fetchListGoods(data.cate_list[0].cate_id)(dispatch);
        })

      .catch(() => {
        dispatch({
          type: consts.LIST_NAV_FAIL,

        });
      })
    }



    export const fetchListGoods = (id) => {
      return (dispatch) => {
        fetch('/wap/?g=WapSite&c=Exchange&a=get_cate_child', {
            method: 'POST',
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: 'cate_id=' + id
          })
          .then((res) => res.json())
          .then((data) => {
            dispatch({
              type: consts.LIST_GOODS_SUCCESS,
              GoodItems: data.cate_list,

            });
          })
          .catch(function(e) {
            console.log("加载失败");
          });
      }
    }


    // 更新loading状态
    export function updateLoadingStatus(nextStatus) {
      return {
        type: consts.LIST_UPDATE_LOADING_STATUS,
        nextStatus: nextStatus
      };
    }



    //////iscrool///////