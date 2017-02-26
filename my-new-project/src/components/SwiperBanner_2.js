require('styles/swiper.min.css');
import React from 'react';

var SwiperBanner = React.createClass({

    render: function() {
        return ( < div className = "jf-floor-banner" >
            < div className = "swiper-container swiper1" >
            < BannerHtml / >
            <div className = "swiper-pagination swiper-pagination1" > </div> < /div></div >
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
    componentDidMount() {
        $.getJSON('get_index_Banner').then(
            value => this.setState({
                loading: false,
                data: value
            }),
            // error => this.setState({
            //     loading: false,
            //     error: error
            // })
        );

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
                return (<div className = "swiper-slide"
                            key = { index } > <a href = { repo.adv_url } > <img className = "swiper-lazy"
                            data-src = {repo.adv_img }
                            /></a> </div>);

            });
            return (<div className = "swiper-wrapper" > { repoList } </div>);

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