import React from 'react';
import $ from 'jquery';

class PayWay extends React.Component {
    chooseType() {
        $('#chooseType').show();
        $('#payWay').hide();


        console.log('test');
    }
    render() {
        return (
            <div>
            <div id='payWay' className="payWay">
   <div className="product-icon cover-close">
        <a className="close"></a>
                </div>

<div className='wbox-flex payTitle'>付款方式</div>
<ul className='payList'>
<li >
    <label >付款金额</label>
    <p className="payMoney"><em>¥</em><span>18.50</span></p>
</li>
<li>
    <label >付款账号</label>
    <p>小麦</p>
</li>
<li id='chooseType' onClick={this.chooseType.bind(this)}>
    <label>兑换积分类型</label>
    <p><span>购物积分</span><em className='blockUp'></em></p>
</li>
<li>
    <label>付款方式</label>
    <p><i className='payIcon'></i><span>惠积分支付</span><em className='blockUp'></em></p>
</li>
</ul>
            <div className='fix-box product-payup'>
        <div className='pay-item'>
        <div className='wbox-flex tc exchange-submit'>
        <a className='th-btn th-btn-assertive'>确认支付</a>
                        </div>
                    </div>
                </div>
                </div>
                <ChooseType/>
                </div>
        )

    }
}


class ChooseType extends React.Component {
    render() {
        return (
            <div id='chooseType' className="payWay">
   <div className="product-icon cover-close">
        <a className="close"></a>
                </div>

<div className='wbox-flex payTitle'>选择积分类型</div>
<ul className='payList'>
<li className="cur"> 
    <label >排点积分</label>
   <i className="round"></i>
</li>
<li>
    <label >旅游积分</label>
   <i className="round"></i>
</li>
<li>
    <label>购物积分</label>
   <i className="round"></i>
</li>

</ul>
            <div className='fix-box product-payup'>
        <div className='pay-item'>
        <div className='wbox-flex tc exchange-submit'>
        <a className='th-btn th-btn-assertive'>确定</a>
                        </div>
                    </div>
                </div>
                </div>
        )
    }
}
export default PayWay;