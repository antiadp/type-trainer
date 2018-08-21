import React, { Component } from 'react'

class Metrics extends Component {
    constructor() {
        super()
        this.state = {
            keyPresses: 100,
            numErrors: 5,
            iOfLastCharTyped: 0,
            currentTime: 3,
            WPM: 0,
            CPM: 0,
            ACC: 100,
            DEM: 0,
            baseTimer:3,
            snippet:'',
            userInput:''
        }
    }
    componentDidMount(){

    }


    everySecond = () => {
        this.setState({
            currentTime: this.state.currentTime - 1
        })
        this.startTimer()
    }
    startTimer = () => {
        if (this.state.currentTime > 0) {
            setTimeout(this.everySecond, 1000)
        }else if(this.state.currentTime === 0 || this.state.currentTime<0){
            return
    }
}


    render() {

        if(this.props.userInput.length===1){
            this.startTimer()
        }

        return (
            <div className="metrics-wrapper">
                <div className="WPM">
                    <h1>{this.state.WPM}</h1>

                    <h4>WPM</h4>
                </div>
                <div className="CPM">
                    <h1>{this.state.CPM}</h1>

                    <h4>Characters per minute</h4>
                </div>
                <div className="ACC">
                    <h1>{this.state.ACC}%</h1>

                    <h4>Accuracy</h4>
                </div>
                <div className="timer-wrapper">
                    <h1>{this.state.currentTime}</h1>
                    <h4>Seconds</h4>
                </div>
            </div>
        )
    }
}
export default Metrics