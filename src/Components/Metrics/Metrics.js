import React, { Component } from 'react'

class Metrics extends Component {
    constructor() {
        super()
        this.state = {
            keyPresses: 100,
            numErrors: 5,
            iOfLastCharTyped: 0,
            // totalChars: [].length - iOfLastCharTyped,
            currentTime: 60,
            WPM: 0,
            CPM: 0,
            accuracy: 0,
            DEM: 0
            
        }
    }
    componentDidUpdate(){
        // this.setState({
        //     keyPresses: this.state.keyPresses,
        //     numErrors: this.state.keyPresses,
        //     totalChars: this.state.totalChars,
        //     currentTime: this.state.currentTime,
        //     DEM: ((this.state.accuracy/100) * (this.state.WPM - this.state.numErrors))
        // })
    }

    


    render() {
        return (
            // <div className="metrics-wrapper">
            <div className="metrics-wrapper">
                <div className="WPM">
                    <h1>{this.props.WPM}</h1>
                    {
                        function WPM(){
                            let grossWPM = (this.state.keyPresses / 5) / (60)
                            let netWPM = grossWPM - (this.state.numErrors / 60)
                                return Math.round(netWPM)
                        }
                    }
                    <h4>WPM</h4>
                </div>
                <div className="CPM">
                    <h1>{this.props.CPM}</h1>
                    {
                        function CPM(){
                            let netCPM = this.state.keyPresses - this.state.numErrors
                                return netCPM
                        }
                    }
                    <h4>Characters per minute</h4>
                </div>
                <div className="ACC">
                    <h1>{this.props.ACC}</h1>
                        {
                            function accuracy(){
                                let acc = (this.state.keyPresses - this.state.numErrors) / this.state.keyPresses
                                    return acc
                            }
                        }
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