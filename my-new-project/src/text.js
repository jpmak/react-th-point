require('styles/base.scss');
require('styles/jf.scss');

import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';



import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const ParamsExample = () => (
  <Router>
    <div>
      <h2>Accounts</h2>
      <ul>
        <li><Link to="/netflix">Netflix</Link></li>
        <li><Link to="/zillow-group">Zillow Group</Link></li>
        <li><Link to="/yahoo">Yahoo</Link></li>
        <li><Link to="/modus-create">Modus Create</Link></li>
      </ul>

      <Route path="/:id" component={Child}/>
    </div>
  </Router>
)

const Child = ({
  match
}) => (
  <div>
    <h3>ID: {match.params.id}</h3>
  </div>
)

ReactDOM.render( < ParamsExample / > , document.getElementById('app'));