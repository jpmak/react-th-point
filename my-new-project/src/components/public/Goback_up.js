import React from 'react';
import Goback from './Goback';
class Goback_up extends React.Component {
    componentDidMount() {}
    handClick() {
        $('#searchInput').val("")
        $('#searchInput').blur();
        $('#js-list,.class,.result-wp').show();
        $('.search-wrap,.th-search-box .backbtn').hide();
    }

    render() {
        return (
            <div>
                <a className="backbtn" onClick={this.handClick}></a>
</div>
        )


    }
}
export default Goback_up;