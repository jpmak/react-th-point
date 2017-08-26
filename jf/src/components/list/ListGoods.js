import React from 'react';



class ListGoods extends React.Component {

    render() {
        let ListGoods = this.props.listGood;
        let ListGood = ListGoods.map(function(good, index) {
            return (
                <li key={index} className={this.cheack(index)} onClick={this.handleClick.bind(this,index,list.cate_id)}>{Cate.cate_name}</li>
            )
        }, this)
        return (
            <div id="js-list-img" class="list-details wbox-flex overtouch">
                <div class="list-detail">
                    <div class="list-label list-label-img ">
                    {ListGood}
                    </div>
                </div>
            </div>
        )
    }
}
export default ListGoods;