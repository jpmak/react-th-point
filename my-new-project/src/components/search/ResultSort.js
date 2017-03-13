import React from 'react';
class ResultWrap extends React.Component {
    componentDidMount() {}
    render() {
        return (
            <div className="w result-wp">
        <div className="result-sort">
            <li className="cur">综合</li>
            <li className="volume">兑换排行</li>
            <li className="arrow price">香蕉</li>
            <li className="icons-list ver-icon"></li>
        </div>
        <div className="app-pd-list hor-list">
            <ul>
            </ul>
        </div>
        <div className="load-tip"></div>
    </div>
        );
    }
}

export default ResultWrap;