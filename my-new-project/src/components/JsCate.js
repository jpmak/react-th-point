import React from 'react';


var JsPrduct = React.createClass({
    getInitialState: function() {
        return {
            loading: true,
            data: null

        };
    },

    render: function() {
        return (
            <div className="app-pd-wp">
                <div className="app-pd-list">
               <ul dangerouslySetInnerHTML= {{__html:this.props.data}}>
                           
                   </ul> 
                    </div>
                    </div>
        )
    }
})

var App = React.createClass({
    getInitialState: function() {
        return {
            loading: true,
            error: null,
            data: null,
            message:'',
            data_p: null
        };
    },
    componentDidMount: function() {
        $.getJSON('http://dev.thgo8.com/?g=WapSite&c=Exchange&a=get_cate_list',

            function(value) {
                if (this.isMounted()) {
                    this.setState({
                        loading: false,
                        data_p: null,
                        data: value
                    });
                    $('.choose-items-wp li').first().addClass('act');
                    // 初始化

                    var nav_w = $('.app-scroller li').first().width();
                    var fl_w = $('.app-scroller').width();
                    var flb_w = $('.app-scroller-wrap').width();
                    $('.choose-items-wp p').width(nav_w);
                    $('.app-scroller li').on('click', function() {
                        nav_w = $(this).width();
                        $('.choose-items-wp p').stop(true);
                        $('.choose-items-wp p').animate({
                            left: $(this).position().left
                        }, 300);
                        $('.choose-items-wp p').animate({
                            width: nav_w
                        });
                        var fn_w = ($('.app-scroller-wrap').width() - nav_w) / 2;

                        var fnl_l;
                        var fnl_x = parseInt($(this).position().left);
                        $(this).addClass('act').siblings().removeClass('act');
                        if (fnl_x <= fn_w) {
                            fnl_l = 0;
                        } else if (fn_w - fnl_x <= flb_w - fl_w) {
                            fnl_l = flb_w - fl_w;
                        } else {
                            fnl_l = fn_w - fnl_x;
                        }
                        $('.app-scroller').animate({
                            'left': fnl_l
                        }, 300);
                        sessionStorage.left = fnl_l;
                        var c_nav = $(this).find('a').text();
                        // navName(c_nav);
                    });
                    // 初始化
                }
            }.bind(this));
    },
    handleClick: function(event) {
        // this.setState({
        // })

   
const _this = this;
    $.ajax({
        url: 'http://dev.thgo8.com/?g=WapSite&c=Exchange&a=get_cate_goods',
        type: 'POST',
        dataType: 'json',
        data: {
            'cate_id': event,
            'page': 0
        },

        success: function(data, textStatus, xhr) {
            let cate_listHtml = '';
            if (data.status) {
                       for (var i = 0; i < data.goods_list.length; i++) {
                    cate_listHtml += '  <li><a href="Exchange-goods-' + data.goods_list[i].item_id + '.html"><div class="info-img"><img alt="" class="lazy" data-original="' + data.goods_list[i].list_image + '"></div><div class="info-bar"><div class="pro-title">' + data.goods_list[i].goods_name + '</div><div class="e-numb"><span class="e-price"><em>' + data.goods_list[i].item_price + '</em>积分</span></div></div></a></li>';
                }
      _this.setState({
            message:cate_listHtml
        })
            } else {
        }
    }
    });
    },
    render: function() {
        if (this.state.loading) {
            return <span > Loading... </span>;
        } else {
            var Cates = this.state.data.cate_list;
            var self = this;
            var CateList = Cates.map(function(Cate, index, event) {
                // var indexS = index.shift();
         var message_id=Cates[0].cate_id;

                return (
                    <li key={index} id={Cate.cate_id}  onClick={self.handleClick.bind(self,Cate.cate_id)}><a><span>{Cate.cate_name}</span></a></li>
                );
            });
            return (
                <div>
                    <div id="app-scroller" className="app-scroller-wrap" style={{'height': '.75rem'}}>
                        <div className="app-scroller">
                            <ul className="choose-items-wp">
                            {CateList}
                                <p style={{'top':'.7rem'}}><b></b></p>
                            </ul>
                        </div>
                    </div>
            <JsPrduct data={this.state.message}/>
                </div>
            )

        }
    }



})


export {
    App,

    JsPrduct
};