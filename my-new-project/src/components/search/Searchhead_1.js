import React from 'react';
let sVal = '';
let keyword = '';
let page_state = 1;
let page = 0;
let volume = '';
let price = '';
let c_id = '';
let arrval = new Array();
// let sVal = '';
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

class SearchBtn extends React.Component {
    handleClick() {

        var sVal = $('#searchInput').val();
        $('a.search-btn').on('click', function() {
            if (sVal !== '') {
                keyword = sVal;
            }
            console.log(keyword);
        });
    }
    render() {
        return (
            <a className="search-btn" onClick={this.handleClick}>搜索</a>
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
    handleClick() {
        this.refs.myTextInput.focus();
    }
    handleDel() {
        $('#searchInput').val('').focus();
        $('#del').hide();
        $('.search-bar input').css('width', '100%');
    }

    render() {
        return (
            <div>
         
            <div className="wbox search-bar" >
                    <i className="th-search-iconbtn"></i>
                    <div id="del" className="delete" onClick={this.handleDel} ></div>
                    <div className="wbox-flex">
        <input id="searchInput" style={{'width':'80%'}} className="th-search-form" type="text" placeholder="搜索商品关键字" ref="myTextInput"  />
                    </div>
                </div>
                </div>);
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
class ResultWrap extends React.Component {

    componentWillMount() {
        this.handload()
    }
    handload() {
        const _this = this;
        $.ajax({
            url: 'http://dev.thgo8.com/?g=WapSite&c=Exchange&a=search_goods',
            type: 'POST',
            dataType: 'json',
            Thread: true,
            data: {
                'keyword': keyword,
                'volume': volume,
                'by': price,
                'page': page
            },
            error: function() {
                alert('网络连接失败！');
            },
            success: function(data) {

                var searchHtml = '';
                if (data.status) {
                    $('.result-sort').show();
                    for (var i = 0; i < data.goods_list.length; i++) {
                        searchHtml += '<li><a href="Exchange-goods-' + data.goods_list[i].item_id + '.html"><div class="info-img"><div><img alt=""class="lazy"data-original="' + data.goods_list[i].list_image + '"></div></div><div class="info-bar"><div class="pro-title">' + data.goods_list[i].goods_name + '</div><div class="e-numb"><span class="e-price"><em>' + data.goods_list[i].item_price + '</em>积分</span></div></div></a></li>'
                    }
                    if (page === 0) {
                        $('.app-pd-list ul').html(searchHtml);
                    } else {
                        $('.app-pd-list ul').append(searchHtml);
                        page_state = 1;
                        $('.load-tip').hide();
                    }
                } else {

                    if (page > 0) {
                        $('.load-tip').show().html("没有更多数据了");
                    } else {
                        var liHtml = '';
                        page_state = 0;
                        liHtml += '<div class="none-data"></div>';

                        $('.app-pd-list ul').html(liHtml);
                    }

                }
                $('img.lazy').show().lazyload({
                    effect: 'fadeIn',
                    skip_invisible: false,
                    threshold: 100
                });
            }
        });

        var winH = $(window).height();
        $(window).scroll(function() {
            var pageH = $(document.body).height();
            var scrollT = $(window).scrollTop();
            var rate = (pageH - winH - scrollT) / winH;
            if (page_state == 1) {
                if (rate < 0.01) {
                    page++;
                    page_state = 0;
                    _this.handload();
                    $('.load-tip').show().html('<i class="r-gif"></i><span>正在载入</span>');
                }
            }
        });
    }
    render() {
        return (
            <div className="w result-wp">
        <div className="result-sort">
            <li className="cur">综合</li>
        <li className="volume">兑换排行</li>
            <li className="arrow price">香蕉</li>
            <li className="icons-list ver-icon"></li>
        </div>
        <div className="app-pd-list hor-list">
            <ul>
  
            </ul>
        </div>
        <div className="load-tip"></div>
    </div>
        );
    }
}


export {
    Searchhead,
    ResultWrap
}