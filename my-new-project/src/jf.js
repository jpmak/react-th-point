require('styles/base.scss');
require('styles/jf.scss');

import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
// import AppComponent from './components/Main';
import R_jf from './r_jf';
import R_search from './r_search';
import R_det from './r_det';

import {
  BrowserRouter as Router,
  hashHistory,
  Route,
  Link
} from 'react-router-dom'
// import { Router , Route , hashHistory , Link } from 'react-router';


// const Home = () => (
//   <div>
//     <h2>Home</h2>
//   </div>
// )

// const About = () => (
//   <div>
//     <h2>About</h2>
//   </div>
// )
// const Detail = () => (
//   <div>
//         <header id="headnav"><TopNav titleName = "产品详情" icon = "jf-record-icon"  dis = "none" /></header>
// <div id="detwrap"><DetBody/></div>
//   </div>
// )

// const Search = () => (
//   <div>
//                <div id="js-search-box"> <Searchhead onName = ' on-focus ' /></div>
//          <div id="ResultWrap"></div>
//    </div>
// )


const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)
const E = () => (
  <div>
    <h2>E</h2>
  </div>
)
const App = () => (
  <Router>
  </Router>
)
const Jf = () => (
  <Router history={hashHistory}>
      <div>
       <Link to="/jf/R_search">1</Link>
        <Link to="/jf/R_det"> 2 </Link>
        <Link to="/jf/"> 3 </Link>
        <Link to="/jf/E"> 4 </Link>



    <Route exact  path="/jf.html/" component={Home}/>
    <Route  path="/jf/E" component={E}/>

    <Route path="/jf/R_search" component={R_search}/>
    <Route path="/jf/R_det" component={R_det}/>

    </div>
  </Router>
)
ReactDOM.render(<Jf/>, document.getElementById('jf-app'));



// render((
//   <Router history={hashHistory}>
//     <Route path="/" component={First}>
//     </Route>
//     <Route path="/Three" component={Three}/>
//     <Route path="/Three/:name" component={Four}/>
//     <Route path="/Two" component={Two}/>
//   </Router>
// ), document.getElementById('jf-app'))
export default Home