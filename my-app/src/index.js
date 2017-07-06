import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import styles from './style.css'

class ScopedSelectors extends React.Component {
  render() {
    return (
      <div id={styles.example }>
        <p className={styles.hello }>Scoped Selectors</p>
        </div>
    );
  }
};
ReactDOM.render(
	<ScopedSelectors />,
	document.getElementById('root')
);
// 
// 
// import React, {
// 	Component
// } from 'react'
// // import PropTypes from 'prop-types'
// import ReactDOM from 'react-dom'
// import {
// 	createStore
// } from 'redux'
// import {
// 	Provider,
// 	connect
// } from 'react-redux'

// React component
// 
// 
