import React from 'react';
var SearchBox = React.createClass({
    render: function() {
        return (
            <div className="th-search-container on-blur" style={{'display': 'block'}}>
            <div className="th-search-box">
                <div className="th-search-shadow"></div>
               <SortsBtn Sorthref="Exchange-category.html"/>
                <a className="backbtn"></a>
        <a className="search-btn" >搜索</a>
                <div className="wbox search-bar pr">
                    <i className="th-search-iconbtn"></i>
                    <div id="del" className="delete" onclick="del()"></div>
                    <div className="wbox-flex">
               <div className="th-search-form">
                            <input id="searchInput" className="th-search-form" type="text" placeholder="搜索商品关键字" autocomplete="off" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="search-wrap">
                <div className="search-keywords bor-b">
                    <div className="search-keywords-name">
                        <span>历史记录 <i className="delbtn" style={{'display': 'none'}}></i></span>
                    </div>
                    <div className="search-keywords-list ">
                        <li>
                            <a>
                            </a>
                        </li>
                    </div>
                </div>
                <div className="search-keywords">
                    <div className="search-keywords-name" style={{'display': 'none'}}>
                        <span>热门记录</span>
                    </div>
                    <div className="search-keywords-list ">
                    </div>
                </div>
       
            </div>
        </div>

        )
    }
})

var SortsBtn = React.createClass({
    render: function() {
        return (
            <a className="class sorts" href={this.props.Sorthref}></a>
        )
    }
})


export default SearchBox;