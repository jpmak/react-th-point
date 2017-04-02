import React from 'react';
class Del_val extends React.Component {
    handClick() {
        $('#searchInput').val('').focus();
        $('#del').hide();
        $('.search-bar input').css('width', '100%');
    }
    render() {
        return (
            <div id="del" className="delete" onClick={this.handClick} ></div>
        )


    }
}
export default Del_val;