require('styles/base.scss');
require('styles/jf.scss');

import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
// import AppComponent from './components/Main';
import TopNav from './components/TopNav';
import SearchBox from './components/SearchBox';
import {
  SwiperBanner,
  Js_banner,
  Js_banner_2
} from './components/SwiperBanner';
import Record from './components/Record';
import SalesWrapper from './components/SalesWrapper';
import JsCate from './components/JsCate';
import {
  Searchhead,
  ResultWrap
} from './components/search/Searchhead';

// import Detail from './components/det';
import DetBody from './components/det/DetBody';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const urlRoot = 'http://dev.thgo8.com/'


const R_jf = () => (
  <div>
       <header id="headnav">
   <TopNav titleName = "兑换商城"	icon = "jf-record-icon" icon_link = "search.html" />
    </header>
     <div className="w">
      <div id="search">
 <SearchBox />
      </div>
      <div id="scroll-wrapper">
        <div id="banner">
<SwiperBanner/>
        </div>
            <div id="record">
<Record handhref = "exchangeLog.html"/>
            </div>
          <div className="fl-space"></div>
          <div className="jf-bsell-box">
              <div id="js_banner" className="banner">
               <Js_banner />
              </div>
              <div id="SalesWrapper" className="sales-wrapper">
              <SalesWrapper />
                </div>
                <div id="js_banner_2" className="banner">
                <Js_banner_2 />
                </div>
            </div>
            <div className="fl-space"></div>
            <div className="app-pro-holder mt20">
                <div className="app-pro-holder mt20">
                <div id="app">
                <JsCate/>
     </div>
</div>
            </div>
        </div>
    </div>
    </div>


)

export default R_jf;