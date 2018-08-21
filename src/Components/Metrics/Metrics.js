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
            // console.log('Props has updated')
            this.letterTest()
        }
    }

    WPMCalc = (timerStarted, tempErrs) => {
        // this.props.inputArray
        // console.log('totalChar', totalChar)
        // console.log('allErrs', tempErrs)
        // console.log('time Elapsed', this.state.baseTimer - this.state.currentTime)
        // let wpm = (((totalChar / 5) - (this.state.allErrs - this.state.endErrs)) 
        // / (this.state.baseTimer - this.state.currentTime)) / 60 
        let totalChar = this.props.userInput.length
        let now = new Date()
        let typeinstance = now.getTime()
        let errs = (tempErrs - this.state.endErrs)
        let miniWPM = totalChar - errs;
        let timerBegin = timerStarted || this.state.testStart
        let timer = (typeinstance - timerBegin)
        // let topHalf = miniWPM - errs
        // let temp = top/timer
        // let temp2 = temp/60

        let wpm = (miniWPM / 5) / (timer / 60000)

        // debugger

        wpm = Math.round(wpm)
        this.setState({ WPM: wpm })
        // console.log('wpm', wpm)
        // console.log('date obj', timerBegin)
        // console.log('-------------------------')
    }
    CPMCalc = () => {
        let cpm = this.state.WPM * 5
        cpm = Math.round(cpm)
        this.setState({
            CPM: cpm
        })
    }
    ACCCalc = () => {
        // (Input Length-End Erros)/Input Length
        let totalChar = this.props.userInput.length
        let acc = (totalChar - (this.state.allErrs-this.state.endErrs)) / totalChar

        this.setState({
            ACC: acc * 100
        })
    }
    DEMCalc = () => {
        // WPM*ACC((Input Length - Total Errors)/Input Length)
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
            // console.log('all errs',this.state.allErrs)
            // console.log('end errs', this.state.endErrs)
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
        // if (this.props.userInput.length === this.props.snippet) {
        let snippetArray = this.props.snippet.split('')
        let inputArray = this.props.userInput.split('')
        for (let i = 0; i < inputArray.length; i++) {
            if (inputArray[i] !== snippetArray[i]) {
                let temp = this.state.endErrs + 1
                this.setState({
                    endErrs: temp
                })
            }
            // }
        }
        // console.log('allErrs', this.state.allErrs)
        // console.log('endErrs', this.state.endErrs)

    }


    render() {
        let {ACC,WPM, testStart} = this.state
        console.log({ACC},{WPM},{testStart})
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