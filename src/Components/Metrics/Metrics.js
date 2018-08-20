import React, { Component } from 'react'

class Metrics extends Component {
    constructor() {
        super()
        this.state = {
            WPM: 0,
            CPM: 0,
            ACC: 100,
            DEM: 0,
            currentTime: 10,
            baseTimer: 10,
            endErrs: 0,
            allErrs: 0
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.userInput !== this.props.userInput) {
            console.log('Props has updated')
            this.letterTest()
        }
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
        } else if (this.state.currentTime === 0 || this.state.currentTime < 0) {
            this.endTest()
        }
    }
  
    letterTest = () => {
        console.log('letterTest')
        let snippetArray = this.props.snippet.split('')
        let inputArray = this.props.userInput.split('')
        let inputLength = inputArray.length
        if (inputArray[inputLength - 1] !== snippetArray[inputLength - 1]) {
            this.setState({
                allErrs: this.state.allErrs + 1
            })
        }
        if (this.props.userInput.length === this.props.snippet.length || this.state.currentTime === 0 || this.state.currentTime < 0) {
            this.endTest()
        }

    }
    endTest = () => {

        console.log('timer is out, or snippet is of equal length')
        if (this.props.userInput.length === this.props.snippet) {
            let snippetArray = this.props.snippet.split('')
            let inputArray = this.props.userInput.split('')
            for (let i = 0; i < inputArray.length; i++) {
                if (inputArray[i] !== snippetArray[i]) {
                    this.setState({
                        endErrs: this.state.endErrs + 1
                    })
                }
            }
        }
    }


    render() {

        if (this.props.userInput.length === 1) {
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