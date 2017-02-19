require('styles/swiper.min.css');
import React from 'react';

var SwiperBanner = React.createClass({

    render: function() {
        return ( < div className = "jf-floor-banner" >
            < div className = "swiper-container swiper1" >
            < BannerHtml />
            <div className = "swiper-pagination swiper-pagination1" > </div></div></div >
        );
    }
})

var BannerHtml = React.createClass({
            getInitialState: function() {
                return {
                    loading: true,
                    // error: null,
                    data: null
                };
            },
          componentDidMount: function() {

        $.get("get_index_Banner", function(value) {
            // console.log(bann_top.advList[0].adv_img);
            if (this.isMounted()) {
                this.setState({
                 loading: false,
                  data: value
                });

            }
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
                observeParents: true, //修改swiper的父元素时，自动初始化swiper
            });
            $("img.lazy").show().lazyload({
                placeholder: "/src/images/f-bg.gif",
                skip_invisible: false,
                effect: "fadeIn",
                threshold: 50,
            });
        }.bind(this));
    },
            render: function() {
                if (this.state.loading) {
                    return <span > Loading... </span>;
                } 
                // else if (this.state.error !== null) {
                //     return <span > Error: { this.state.error.message } </span>;
                // }
                 else {
                    var repos = this.state.data.bann_top.advList;
                    var repoList = repos.map(function(repo, index) {
                        return ( <div className = "swiper-slide"
                            key = { index } > <a href = { repo.adv_url } > <img className = "swiper-lazy"
                            data-src = {repo.adv_img }
                            /></a> </div>
                        );

                    });
                    return ( <div className = "swiper-wrapper" > { repoList } </div>);

                    }
                }


                //     render: function() {

                //              var repoList =  this.state.linkOns.map(function(linkOn,i){
                //         return (
                //             <div className="swiper-slide"  key={i}><a href={this.state.banner_href}><img className="swiper-lazy"  data-src={this.state.imgsrc} /></a></div>
                //         )})

                //         return(
                //                <div>
                // {repoList}
                //         </div>
                //         )
                //     }
            })

        export default SwiperBanner;
