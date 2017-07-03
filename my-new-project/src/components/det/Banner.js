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
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        // var repos = this.props.data.bann_top.advList;
        let repos = this.props.imgsrc

        let repoList = repos.map(function(repo, index) {

            return (

                <div className = "swiper-slide" key = { index } ><img className = ""  src = {repo}/> </div>

            );


        });
        console.log(repos)

        // // console.log(repoList) 
        //  {
        //     this.props.imgsrc.map(function(repo, index) {

        //         return (

        //         <div className = "swiper-slide" key = { index } ><img className = ""  src = {repo}/> </div>

        //         )
        //     })
        // } ;
        return (
            <div>

          {this.props.imgsrc.map(function (repo, index) {
            return   <div className = "swiper-slide" key = { index } ><img className = ""  src = {repo}/> </div>
          })}

   
     
</div>

        )
    }
}
export default Banner;