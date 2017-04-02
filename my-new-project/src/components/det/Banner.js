import React from 'react';
class Banner extends React.Component {
    componentDidMount() {}
    render() {
        // var repos = this.props.data.bann_top.advList;
        let repos = this.props.imgsrc
        let repoList = repos.map(function(repo, index) {
            return (
                <div className = "swiper-slide"
                            key = { index } >  <img className = "swiper-lazy"
                            data-src = {repo}
                            /> </div>
            );

        });
        // var repoList = 12;
        return (
            <div className="slider">
            <div className="page">
                <div className="big_img_wrapper">
                    <div className="swiper-wrapper">
        { repoList }
                    </div>
                    <div className="swiper-pagination big-img-pagination">
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
export default Banner;