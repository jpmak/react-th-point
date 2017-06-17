import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import {
  createStore
} from 'redux'
import {
  Provider,
  connect
} from 'react-redux'

// React component
// 
// 
class Er extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // getId: eventId,
      saleProp: 22

    };

  }
  render() {
    return (
      <div>
        <span>{this.state.saleProp}</span>
      </div>
    )
  }
}

class Ok extends Component {
  render() {
    return (
      <div>
        <span>{this.props.value}</span>
      </div>
    )
  }
}

class Counter extends Component {
  render() {
    const {
      value,
      onIncreaseClick
    } = this.props
    return (
      <div>
        <span>{value}</span>
        <button onClick={onIncreaseClick}>Increase</button>
      </div>
    )
  }
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncreaseClick: PropTypes.func.isRequired
}

// Action
const increaseAction = {
  type: 'increase'
}

// Reducer
function counter(state = {
  count: 22
}, action) {
  const count = state.count
  switch (action.type) {
    case 'increase':
      return {
        count: count + 1
      }
    default:
      return state
  }
}

// Store
// const store = createStore(counter)
const store = createStore(counter)


// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.count
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction)
  }
}



// Connected Component
// const App = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Counter)

const Ok = connect(
  mapStateToProps
)(Er)

// ReactDOM.render(
//   <Provider store={store}>
//     <Ok />
//   </Provider>,
//   document.getElementById('jf-app')
// )
ReactDOM.render(
  <Provider store={store}>
  <Ok  />
  </Provider>,
  document.getElementById('jf-app')
)