import React from 'react';
import $ from 'jquery';
import style from './LoadingLayer.css';
import loadingImg from './loading.svg';

export default class LoadingLayer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let outerStyle = this.props.outerStyle ? this.props.outerStyle : {};
        let innerStyle = this.props.innerStyle ? this.props.innerStyle : {};
        let onRetry = this.props.onRetry ? this.props.onRetry : () => {};
        let loadingStatus = this.props.loadingStatus ? this.props.loadingStatus :
            0; // 0: wait for loading 1: isLoading, 2: loading ok 3:loading fail

        let loadingTips = (<span>开始加载</span>);
        if (loadingStatus == 1) {
            loadingTips = (
                <div className='overlayLoader'>
            <div className='loader'>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            );
        } else if (loadingStatus == 2) {
            loadingTips = (<span>加载完成</span>);
        } else if (loadingStatus == 3) {
            loadingTips = (<span>加载失败，点击尝试刷新</span>);
        }

        console.log(loadingTips);
        return (
            <div id='outer' style={outerStyle}>
                <div id='inner' style={innerStyle} onClick={onRetry}>
                    {loadingTips}
                </div>
            </div>
        );
    }
}

LoadingLayer.contextTypes = {
    router: () => {
        React.PropTypes.object.isRequired
    }
};