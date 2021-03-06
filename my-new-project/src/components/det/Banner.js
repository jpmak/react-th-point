import React from 'react';
import Slider from 'react-slick';



class Banner extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
                slides: this.props.imgsrc
            }
            // this.click = this.click.bind(this)
    }
    componentDidUpdate() {

    }

    render() {
        let settings = {
            dots: true,
            arrows: false,
            nextArrow: true,
            prevArrow: true,
            lazyLoad: true,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        // var repos = this.props.data.bann_top.advList;
        let repos = this.props.imgsrc

        let repoList = (repos || []).map(function(repo, index) {

            return (

                <div className = "swiper-slide" key = { index } ><img className = ""  src = {repo}/> </div>

            );


        });
        if (!repos.length) {
            repoList = <div></div>
        }

        return (
            <div>
<Slider {...settings}>
{repoList}
     </Slider>
     
</div>

        )
    }
}
export default Banner;