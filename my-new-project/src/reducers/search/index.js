import {
  combineReducers
} from 'redux'
import {
  SEARCHPAGE_REDDIT,
  REQUESTPAGE_POSTS,
  RECEIVEPAGE_POSTS,
  INVALIDATE_REDDIT
} from 'actions/search'

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
  items: [],
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
        items: action.posts,
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
  searchPagedReddit
})

export default rootReducer