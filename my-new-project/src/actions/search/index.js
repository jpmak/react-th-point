    import $ from 'jquery';

    export const SEARCHPAGE_REDDIT = 'SEARCHPAGE_REDDIT'
    export const REQUESTPAGE_POSTS = 'REQUESTPAGE_POSTS'

    export const RECEIVEPAGE_POSTS = 'RECEIVEPAGE_POSTS'
    export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'
    export const searchPageReddit = reddit => ({
      type: SEARCHPAGE_REDDIT,
      reddit
    })
    export const requestPagePosts = reddit => ({
      type: REQUESTPAGE_POSTS,
      reddit
    })
    export const invalidateReddit = reddit => ({
      type: INVALIDATE_REDDIT,
      reddit
    })
    export const receivePagePosts = (reddit, data) => ({
      type: RECEIVEPAGE_POSTS,
      reddit,
      posts: data.goods_list,
      status: data.status
    })

    export const fetchPosts = reddit => dispatch => {
      dispatch(requestPagePosts(reddit))
      $.ajax({
        url: 'http://dev.thgo8.com/wap/?g=WapSite&c=Exchange&a=search_goods',
        data: {
          page: `${reddit}`

        },
        type: 'POST',
        dataType: 'json',
        success: (data) => {

          dispatch(receivePagePosts(reddit, data))
            // if (data.goods_list) {
            //   if (isRefresh) { // 刷新操作
            //     if (this.state.pullDownStatus == 3) {
            //       this.setState({
            //         pullDownStatus: 4,
            //         page_state: 1,
            //         items: data.goods_list,
            //         page: data.status
            //       });

          //       this.iScrollInstance.scrollTo(0, -1 * $(this.refs.PullDown).height(), 500);
          //       if (this.state.pullUpStatus == 5) {
          //         this.setState({
          //           pullUpStatus: 0, //
          //           opacity: false
          //         });
          //       }
          //     }
          //   }
          // }
        }
      });


      // return fetch('http://dev.thgo8.com/?g=WapSite&c=Exchange&a=search_goods', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/x-www-form-urlencoded'
      //     },
      //     body: `keyword=2&page=${reddit}`
      //   })
      //   .then(response => response.json())
      //   .then(json => dispatch(receivePagePosts(reddit, json)))
    }

    export const shouldFetchPosts = (state, reddit) => {
      const posts = state.postsByReddit[reddit]
      if (!posts) {
        return true
      }
      if (posts.isFetching) {
        return false
      }
      return posts.didInvalidate
    }

    export const fetchPostsIfNeeded = reddit => (dispatch, getState) => {
      // if (shouldFetchPosts(getState(), reddit)) {
      return dispatch(fetchPosts(reddit))
        // }
    }