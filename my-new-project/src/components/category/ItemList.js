import React from 'react';

class LeftList extends React.Component {


    render() {
        let cateNames = this.props.list_name;
        // console.log(cateNames instanceof Array);
        let cateList = cateNames.map(function(cateName, index) {
            if (index == 0) {
                return (
                    <li className="cur" data-id={cateName.cate_id} key={index}>{cateName.cate_name}</li>
                );
            } else {
                return (
                    <li data-id={cateName.cate_id} key={index}>{cateName.cate_name}</li>
                );
            }
        });


        return (

            <div id="js-list-items">
                <div id="scroller" className="list-items overtouch">
     {cateList}
                </div>
        
            </div>
        )


    }
}
class RightList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Catelist: []

        };

    }
    sendCateAjax(cate_id) {
        fetch("http://dev.thgo8.com/?g=WapSite&c=Exchange&a=get_cate_child", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'cate_id=' + cate_id

            })
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    Catelist: (json.cate_list) ? json.cate_list : ''

                });
                $("img").lazyload({
                    container: $("#js-list-img"), //指定的容器滚定
                    effect: "fadeIn"
                });

            })
            .catch(function(e) {
                console.log("加载失败");
            });


    }

    componentDidUpdate() {
            let cate_id = this.props.cate_id;

            // console.log(cate_id);
            // this.sendCateAjax(cate_id);

        }
        // componentDidMount() {
        //     let cate_id = this.props.cate_id;

    //     console.log(cate_id);
    //     this.sendCateAjax(cate_id);
    // }
    render() {
        let CateLiLists = this.state.Catelist;
        let Catelist = CateLiLists.map(function(CateLiList, index) {
            let thcates = CateLiList.thcate;

            let thcatelist = thcates.map(function(thcate, index) {
                return (
                    <li key={index}><a href="search.html"><img data-original={thcate.cate_thumb}/><span>{thcate.cate_name} </span></a></li>
                );
            });
            return (
                <dl key={index}><dt>{CateLiList.cate_name}</dt><dd><ul>{thcatelist}</ul></dd></dl>
            )

        });
        return (

            <div id="js-list-img" className="list-details wbox-flex overtouch">
                <div className="list-detail">
                    <div className="list-label list-label-img ">
         {Catelist}
                    </div>
                </div>
            </div>
        )


    }
}
class ItemList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list_name: [],
            cate_id: ''
        };

    }

    sendajax() {
        fetch("http://dev.thgo8.com/?g=WapSite&c=Exchange&a=get_cate_list", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    list_name: (json.cate_list) ? json.cate_list : '',
                    cate_id: json.cate_list[0].cate_id

                });

            })

        .catch(function(e) {
            console.log("加载失败");
        });

    }
    componentDidMount() {
        this.sendajax();

        $("#js-list-items,.scroll-wrapper,.list-wrap,.list-items,.list-details ").height($(window).height() - $(".th-search-box").height());



    }


    componentDidUpdate() {
        const _this = this;
        let cate_id = this.state.cate_id;
        this.refs.postCateId.sendCateAjax(cate_id);
        // let cate_id = this.state.cate_id;
        // _this.refs.postCateId.sendCateAjax(cate_id);
        $('.list-items li').on('click', function() {
            $('.list-items').animate({
                scrollTop: $(this).offset().top
            }, 500);
            cate_id = $(this).attr('data-id');
            // console.log(liindex);
            if ($('this:has(.cur)')) {
                console.log(123);
                _this.refs.postCateId.sendCateAjax(cate_id);
            }
            $(this).addClass('cur').siblings().removeClass('cur');
        });

    }
    stopPropagation(e) {
        e.stopPropagation();
    }



    render() {

        return (

            <div className="list-wrap wbox">
<LeftList list_name={this.state.list_name}/>
        <RightList cate_id={this.state.cate_id} ref="postCateId"/>

            </div>
        )


    }
}
export default ItemList;