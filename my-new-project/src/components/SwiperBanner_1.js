require('styles/swiper.min.css');
import React from 'react';

var SwiperBanner = React.createClass({

    render: function() {
        return ( < div className = "jf-floor-banner" >
            < div className = "swiper-container swiper1" >
            < div className = "swiper-wrapper" > <BannerHtml  /> < /div> < div className = "swiper-pagination swiper-pagination1" >< /div > < /div > < /div >
        );
    }
})

var BannerHtml = React.createClass({
    getInitialState: function() {
        return {
            imgsrc: '',
            banner_href: ''
        };
    },
    componentDidMount: function() {

        $.get("get_index_Banner", function(data) {
            var linklenght = data.bann_top.advList[0];
            // console.log(bann_top.advList[0].adv_img);
            if (this.isMounted()) {
                this.setState({
                    imgsrc: linklenght.adv_img,
                    banner_href: linklenght.adv_url
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
        return (
            <div className="swiper-slide"><a href={this.state.banner_href}><img className="swiper-lazy"  data-src={this.state.imgsrc} /></a></div>
        );
    }
})

export default SwiperBanner;