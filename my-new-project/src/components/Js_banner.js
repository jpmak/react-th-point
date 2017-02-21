import React from 'react';
var Js_banner = React.createClass({
    getInitialState: function() {
        return {
            imgsrc: '',
            banner_href: ''
        };
    },

    componentDidMount: function() {

        $.getJSON("http://dev.thgo8.com/?g=WapSite&c=Exchange&a=get_index_Banner", function(data) {
            var repos_2 = data.bann_foo1.advList[0];

            if (this.isMounted()) {
                this.setState({
                    imgsrc: repos_2.adv_img,
                    banner_href: repos_2.adv_url
                });
            }
        }.bind(this));
    },
    render: function() {

        // var repos_2 = this.state.data.bann_foo1.advList[0];
        return (
            <a href={this.state.banner_href}><img class="img-banner" src={this.state.imgsrc}/></a>
        );
    }
})

export default Js_banner;