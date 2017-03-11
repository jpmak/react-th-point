import React from 'react';
class Goback extends React.Component {
    componentDidMount() {

    }
    handClick() {

        $('#searchInput').blur();
        $('#js-list,.class,.result-wp').show();
        $('.search-wrap,.th-search-box .backbtn').hide();
    }

    render() {
        return (
            <div>
            <a className="class th-nav-back" href="javascript:history.go(-1);"> </a>
                <a className="backbtn" onClick={this.handClick}></a>
</div>
        )


    }
}
class Inputbox extends React.Component {

    componentDidMount() {
        $('#searchInput').on('keyup focus', function(e) {
            $('.search-bar input').css('width', '80%');
            var uVal = $('#searchInput').val();
            if (uVal !== '') {
                if (e.keyCode === 13) {
                    $('a.search-btn').click();
                }
                $('#del').show();
            } else {
                $('#del').hide();
            }
        });
        $('#searchInput').on('click', function() {
            $('#js-list,.class,.result-wp').hide();
            $('.search-wrap,.th-search-box .backbtn').show();
            $('.th-active,.th-active body').css('overflow', 'auto');

        });

    }
    handDel() {
        $('#searchInput').val('').focus();
        $('#del').hide();
        $('.search-bar input').css('width', '100%');
    }

    render() {
        return (
            <div className="wbox search-bar" >
                    <i className="th-search-iconbtn"></i>
                    <div id="del" className="delete" onClick={this.handDel} ></div>
                    <div className="wbox-flex">
        <input id="searchInput" style={{'width':'80%'}} className="th-search-form" type="text" placeholder="搜索商品关键字" autocomplete="off" />
                    </div>
                </div>
        );
    }


}
class SearchBtn extends React.Component {
    render() {
        return (
            <a className="search-btn">搜索</a>
        )
    }
}
class SearchResult extends React.Component {

    render() {
        return (
            <div className = "search-wrap" >
            <div className="search-keywords bor-b">
                <div className="search-keywords-name">
                    <span>历史记录 <i className="delbtn"></i></span>
                </div>
                <div className="search-keywords-list ">
                </div>
            </div>
            </div>
        )
    }
}
class Searchhead extends React.Component {
    render() {
        return (
            <div>
        <div className= {'th-search-container th-nav-list pr'+ this.props.onName}>
            <div className="th-search-box">
                <div className="th-search-shadow"></div>
         <Goback/>
                <SearchBtn/>
         <Inputbox/>
            </div>
        </div>
<SearchResult/>
            </div>
        );
    }
}


export default Searchhead;