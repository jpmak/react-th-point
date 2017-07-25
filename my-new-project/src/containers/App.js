import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'
import {
  connect
} from 'react-redux'
import {
  selectReddit,
  fetchPostsIfNeeded,
  invalidateReddit
} from '../actions'
// import Picker from '../components/Picker'
// import Posts from '../components/Posts'

class App extends Component {
  // static propTypes = {
  //   selectedReddit: PropTypes.string.isRequired,
  //   posts: PropTypes.array.isRequired,
  //   isFetching: PropTypes.bool.isRequired,
  //   lastUpdated: PropTypes.number,
  //   dispatch: PropTypes.func.isRequired
  // }

  componentDidMount() {
    const {
      dispatch,
      selectedReddit
    } = this.props
    dispatch(fetchPostsIfNeeded(selectedReddit))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedReddit !== this.props.selectedReddit) {
      const {
        dispatch,
        selectedReddit
      } = nextProps
      dispatch(fetchPostsIfNeeded(selectedReddit))
    }
  }
  handleChange = nextReddit => {
    this.props.dispatch(selectReddit(nextReddit))
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const {
      dispatch,
      selectedReddit
    } = this.props
    dispatch(invalidateReddit(selectedReddit))
    dispatch(fetchPostsIfNeeded(selectedReddit))
  }
  render() {
    const {
      // selectedReddit,
      posts
      // isFetching,
      // lastUpdated
    } = this.props

    console.log(this.props.posts);
    // const isEmpty = posts.length === 0
    return (
      <div>
12
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {
    selectedReddit,
    postsByReddit
  } = state
  const {
    isFetching,

    items: posts
  } = postsByReddit[selectedReddit] || {
    isFetching: true,
    items: []
  }
  return {
    selectedReddit,
    posts,
    isFetching

  }
}

export default connect(mapStateToProps)(App)