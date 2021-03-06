import React from 'react';
import PutBtn from './PutBtn';

import $ from 'jquery';
class ProductCover extends React.Component {
    render() {
        const _this = this;
        let salePropHeight = '40%';
        let saleProps = this.props.saleProp ? this.props.saleProp : [];
        let itemUrls = this.props.itemUrl;
let imgsrc=this.props.imgsrc?this.props.imgsrc[0]:'';
        let salePropList = saleProps.map(function(saleProp, index) {
            let propLis = saleProp.props;
            let PropKeys = Object.keys(propLis);
            let PropKeyList = PropKeys.map(function(propLi, index) {
                if (index === 0) {
                    return (
                        <a className='value cur disabled' key={index} onClick={(event) => { event.preventDefault()  }} id={itemUrls[propLi]}>{propLis[propLi]} </a>
                    );
                } else {
                    return (
                        <a className='value' key={index} onClick={(event) => { event.preventDefault()  }}  id={itemUrls[propLi]}>{propLis[propLi]} </a>
                    );
                }
            }, _this);
            return (
                <li key={ index }>
                <h2>{saleProp.prop_name}</h2>
            <div className="items">
        {PropKeyList}
                    </div>
                                </li>
            );
        });
        if (this.props.saleProp) {
            salePropHeight = '80%'
        } else {
            salePropHeight = '40%'
        }

        return (
            <section className="product-cover" style={{height:salePropHeight}}>
        <div className="wbox-flex">
        <div className="product-icon cover-close">
        <a className="close"></a>
                </div>
        <div className="cover-head wbox">
        <div className="img-box "><img src={imgsrc} alt=""/></div>
        <div className="product wbox-flex">
        <p className="num">¥<em>{this.props.item_price}</em><span>积分</span></p>
        <p className="remaining">剩余库存: <em id="stock">{this.props.stock}</em></p>
        <p className="select">{this.props.item_name}</p>
                    </div>
                </div>

        <div className="cover-body wbox-flex" style={{'display':this.props.isDisplay}}>
        <ul className="select-list">
        {
            salePropList
        }
                    </ul>
                </div>
             
        <div style={{color:'#ccc',textAlign:'center','display':!this.props.isDisplay}}>无可选属性</div>
          <PutBtn/>
       
            </div>
        </section>
        )
    }
}
export default ProductCover;