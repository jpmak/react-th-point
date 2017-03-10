import React from 'react';

var Searchhead = React.createClass({
    render: function() {
        return (
            <div>

        <div className="th-search-container on-focus th-nav-list pr">
            <div className="th-search-box">
                <div className="th-search-shadow"></div>
                <a className="className th-nav-back" href="javascript:history.go(-1);"> </a>
                <a className="backbtn"></a>
                <a className="search-btn">搜索</a>
                <div className="wbox search-bar" >
                    <i className="th-search-iconbtn"></i>
                    <div id="del" className="delete" onclick="del()"></div>
                    <div className="wbox-flex">
                        <input id="searchInput" className="th-search-form" type="text" placeholder="搜索商品关键字" autocomplete="off" value=""/>
                    </div>
                </div>
            </div>
        </div>
        <div className="search-wrap">
            <div className="search-keywords bor-b">
                <div className="search-keywords-name">
                    <span>历史记录 <i className="delbtn"></i></span>
                </div>
                <div className="search-keywords-list ">
                </div>
            </div>
        </div>

</div>
        );
    }
})


export default Searchhead;