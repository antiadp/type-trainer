import React, { Component } from 'react'

class Metrics extends Component {
    constructor() {
        super()
        this.state = {
            keyPresses: 0,
            numErrors: 0,
            seconds: 0,


        }
    }
    render() {
        return (
            // <div className="metrics-wrapper">
            <div className="metrics-wrapper">
                <div className="WPM">
                    <h1>{this.props.WPM}</h1>
                    <h4>WPM</h4>
                        {function calcNetWPM(){
                            var grossWPM = (this.state.keyPresses / 5) / (this.state.seconds / 10 / 60);
                            var netWPM = grossWPM - (this.state.numErrors / this.state.seconds / 10 / 60);
                        return Math.round(netWPM * 100) / 100}
                        }
                </div>
                <div className="CPM">
                    <h1>{this.props.CPM}</h1>
                    <h4>Characters per minute</h4>
                </div>
                <div className="ACC">
                    <h1>{this.props.ACC}</h1>
                    <h4>Accuracy</h4>
                </div>
                <div className="timer-wrapper">
                    <h1>{this.props.timer}</h1>
                    <h4>Seconds</h4>
                </div>
            </div>


            // </div>
        )
    }
}
export default Metrics