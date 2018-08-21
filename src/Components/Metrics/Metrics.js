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
            allErrs: 0,
            testStart: 0

        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.userInput !== this.props.userInput) {
            this.letterTest()
        }
    }

    WPMCalc = (timerStarted, tempErrs) => {
        let totalChar = this.props.userInput.length
        let now = new Date()
        let typeinstance = now.getTime()
        let timerBegin = timerStarted || this.state.testStart
        let errs = (tempErrs - this.state.endErrs)
        let miniWPM = totalChar - errs;
        let timer = (typeinstance - timerBegin)
        let wpm = (miniWPM / 5) / (timer / 60000)

        // debugger
        wpm = Math.round(wpm)

        this.setState({ WPM: wpm })
    }

    CPMCalc = () => {
        let cpm = Math.round(this.state.WPM * 5)

        this.setState({
            CPM: cpm
        })
        
    }

    ACCCalc = () => {
        var totalChar = this.props.userInput.length

        var numberCorrect = totalChar-(this.state.allErrs- this.state.endErrs)

        var acc = numberCorrect / totalChar

        this.setState({
            ACC: acc * 100
        })
    }
    DEMCalc = () => {
        let totalChar = this.props.userInput.length
        let miniACC = (totalChar - this.state.endErrs) / totalChar
        let dem = (this.state.WPM * this.state.ACC) * miniACC
        this.setState({
            DEM: dem
        })

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
        if (this.props.userInput.length === 1) {
            this.startTimer()
            let now = new Date()
            var typingInstance = now.getTime()
            this.setState({ testStart: typingInstance }
            )
        }
        let snippetArray = this.props.snippet.split('')
        let inputArray = this.props.userInput.split('')
        let inputLength = inputArray.length
        if (inputArray[inputLength - 1] !== snippetArray[inputLength - 1]) {
            var errs = this.state.allErrs + 1

            this.setState({
                allErrs: errs
            }, () => { console.log(this.state.allErrs) })
        }
        if (this.props.userInput.length === this.props.snippet.length || this.state.currentTime <= 0) {
            this.endTest()
        }
        this.WPMCalc(typingInstance, errs)
        this.CPMCalc()
        this.ACCCalc()
    }



    endTest = () => {
        this.DEMCalc()
        this.props.toggleReadOnly()

        console.log('timer is out, or snippet is of equal length')
        let snippetArray = this.props.snippet.split('')
        let inputArray = this.props.userInput.split('')
        for (let i = 0; i < inputArray.length; i++) {
            if (inputArray[i] !== snippetArray[i]) {
                let temp = this.state.endErrs + 1
                this.setState({
                    endErrs: temp
                })
            }
        }

    }


    render() {
        let { ACC, WPM, testStart } = this.state
        console.log({ ACC }, { WPM }, { testStart })
        return (
            <div className="metrics-wrapper">
                <div className="WPM">
                    <h1>{this.state.WPM}</h1>
                    <h4>WPM</h4>
                </div>
                <div className="CPM">
                    <h1>{this.state.CPM}</h1>
                    <h4>CPM</h4>
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