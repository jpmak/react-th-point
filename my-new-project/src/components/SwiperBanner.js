require('styles/swiper.min.css');
import React from 'react';
import {
    connect
} from 'react-redux'
const urlRoot = 'http://dev.thgo8.com/'
let repos_2 = '';
let repos_3 = '1';
let adv_url = '2';
let adv_img = '3';


var SwiperBanner = React.createClass({
    render: function() {
        return ( < div className = "jf-floor-banner" >
            < div className = "swiper-container swiper1" >
            < BannerHtml / >
            <div className = "swiper-pagination swiper-pagination1" > </div> < /div></div >
        );
    }
})

// var js_banner = React.createClass({
//     getInitialState: function() {
//         return {
//             adv_url: '',
//             adv_img: ''
//         };
//     },
//     componentDidMount: function() {

//         $.get("http://dev.thgo8.com/?g=WapSite&c=Exchange&a=get_index_Banner", function(data) {
//             var repos_2 = this.state.data.bann_foo1.advList[0];
//             // console.log(bann_top.advList[0].adv_img);
//             if (this.isMounted()) {
//                 this.setState({
//                     adv_img: linklenght.adv_img,
//                     adv_url: linklenght.adv_url
//                 });

//             }
//         }.bind(this));
//     },
//     render: function() {
//         return (<a href={ repos_2.adv_url }><img class="img-banner" src={ repos_2.adv_img }/></a>);
//     }
// })
var BannerHtml = React.createClass({
        getInitialState: function() {
            return {
                loading: true,
                error: null,
                data: null,
                repos_2: '',
                repos_3: ''
            };
        },
        componentWillMount: function() {
            $.getJSON(urlRoot + '?g=WapSite&c=Exchange&a=get_index_Banner', function(value) {
                // console.log(bann_top.advList[0].adv_img);
                if (this.isMounted()) {
                    this.setState({
                        loading: false,
                        data: value
                    });
                }
                // repos_2 = this.state.data.bann_foo1.advList[0];
                repos_3 = this.state.data.bann_foo2.advList[0];
                console.log(repos_2);
                console.log(repos_3);

                var swiper1 = new Swiper('.swiper1', {
                    pagination: '.swiper-pagination1',
                    preloadImages: false,
                    lazyLoading: true, // 滚动加载
                    paginationClickable: true,
                    spaceBetween: 0,
                    centeredSlides: true,
                    autoplay: 2500,
                    autoplayDisableOnInteraction: false,
                    loop: true,
                    observer: true, //修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true //修改swiper的父元素时，自动初始化swiper
                });

            }.bind(this));
        },
        render: function() {
            if (this.state.loading) {
                return <span > Loading... </span>;
            } else {
                var repos = this.state.data.bann_top.advList;
                var repoList = repos.map(function(repo, index) {
                    return (<div className = "swiper-slide"
                            key = { index } > <a href = { repo.adv_url } > <img className = "swiper-lazy"
                            data-src = {repo.adv_img }
                            /></a> </div>);

                });
                return (<div className = "swiper-wrapper" > { repoList } </div>);

            }
        }
    })
    ///////////////////////

///////////////////////
var Js_banner = React.createClass({
    const VisibleTodoList = connect(
            mapStateToProps,
            mapDispatchToProps
        )(BannerHtml),

        function mapStateToProps(state) {
            return {
                todos: getVisibleTodos(state.data)
            };
        },

        function mapDispatchToProps(dispatch) {
            return {
                onIncrement: () => dispatch(increment())
            };
        },

        const getVisibleTodos = (todos) => {

                return todos

            },
            getInitialState: function() {
                return {
                    imgsrc: '',
                    banner_href: ''
                };
            },
            componentDidMount: function() {
                console.log(getVisibleTodos(todos));
            },
            // componentDidMount: function() {
            //     $.getJSON(urlRoot + '?g=WapSite&c=Exchange&a=get_index_Banner', function(data) {
            //         var repos_2 = data.bann_foo1.advList[0];

            //         if (this.isMounted()) {
            //             this.setState({
            //                 imgsrc: repos_2.adv_img,
            //                 banner_href: repos_2.adv_url
            //             });
            //         }
            //     }.bind(this));
            //     if (this.state.imgsrc == 0) {
            //         $('#js_banner').hide();
            //     }
            // },
            render: function() {

                return (
                    <a href={this.state.banner_href}><img className="img-banner" src={this.state.imgsrc}/></a>
                );

            }
})

var Js_banner_2 = React.createClass({
    getInitialState: function() {
        return {
            imgsrc: '',
            banner_href: ''
        };
    },

    // componentDidMount: function() {
    //     $.getJSON(urlRoot + '?g=WapSite&c=Exchange&a=get_index_Banner', function(data) {
    //         var repos_3 = data.bann_foo2.advList[0];

    //         if (this.isMounted()) {
    //             this.setState({
    //                 imgsrc: repos_3.adv_img,
    //                 banner_href: repos_3.adv_url
    //             });
    //         }
    //     }.bind(this));
    // },
    componentDidMount: function() {

        console.log(repos_3);
        console.log(adv_url);
        console.log(adv_img);

        let adv_url = repos_3.adv_url;
        let adv_img = repos_3.adv_img;
    },
    render: function() {

        // var repos_2 = this.state.data.bann_foo1.advList[0];
        // <a href={adv_url}><img className="img-banner" src={adv_img}/></a>
        // 
        return (
            <a href={adv_url}><img className="img-banner" src={adv_img}/></a>
        );
    }
})

export {
    SwiperBanner,
    Js_banner,
    Js_banner_2
};