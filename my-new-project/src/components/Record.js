import React from 'react';
var Record = React.createClass({
    getInitialState: function() {
        return {
            banana: ''
        };
    },
    componentDidMount: function() {
        $.getJSON("../../json/user_info.json", function(data) {
            if (this.isMounted()) {
                this.setState({

                    banana: data.info.banana

                });
            }


        }.bind(this));
    },
    render: function() {
        return (
            <div className="jf-record">
                <div className="box">
                    <div className="jf-left">
                        <i className="th-banana-iconbtn"></i>
                        <div id="record-num" className="num">{this.state.banana}</div>
                    </div>
                    <div className="jf-right"><a className="record" href={this.props.handhref}>兑换记录</a></div>
                </div>
            </div>

        )
    }
})



export default Record;