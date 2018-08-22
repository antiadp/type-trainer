import React, { Component } from 'react'

class Metrics extends Component {
    constructor() {
        super()
        this.allErrs = 0;
        this.state = {
            WPM: 0,
            CPM: 0,
            ACC: 100,
            DEM: 0,
            currentTime: 20,
            baseTimer: 20,
            endErrs: 0,
            allErrs: 0,
            testStart: 0

        }
    }
    // ----------------------------------------------------------------------------------
    //When fired, this will invoke 'everySecond' once every 1000 milliseconds
    //When Timer is 0 or below, it will fire the 'endTest' function.
    startTimer = () => {
        if (this.state.currentTime > 0) {
            setTimeout(this.everySecond, 1000)
        } else if (this.state.currentTime === 0 || this.state.currentTime < 0) {
            this.endTest()
        }
    }
    // ----------------------------------------------------------------------------------
    //Fired every second by 'startTimer'
    //subtracts 1 from the currentTime on state.
    everySecond = () => {
        this.setState({
            currentTime: this.state.currentTime - 1
        })
        this.startTimer()
    }
    // ----------------------------------------------------------------------------------
    // fires every time this.props.userInput changes.
    // if previous props is not equal to the current props, it will fire the 'letterTest' function
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.userInput !== this.props.userInput) {
            this.letterTest()
        }
    }
    // ----------------------------------------------------------------------------------
    // fired every keystroke by 'componentDidUpdate'
    // Function will split props.snippet and 'userInput' and check the last element of 'userInput'
    // -- against the corrisponding element of 'snippet'
    // if the length of 'userInput' is one, fires 'startTimer'
    // if the last element of 'userInput' is not equal to the corresponding element of 'snippet' incriment 'allErrs'
    // if the length of the 'userInput' and the length of the 'snippet' are the same, fire 'endTest'
    // Then it will fire 'WPMCalc', 'CPMCalc', and 'ACCCalc'
    letterTest = () => {
        let snippetArray = this.props.snippet.split('')
        let inputArray = this.props.userInput.split('')
        let inputLength = inputArray.length

        if (this.props.userInput.length === 1) {
            this.startTimer()
            let now = new Date()
            var typingInstance = now.getTime()
            this.setState({ testStart: typingInstance }
            )
        }

        if (inputArray[inputLength - 1] !== snippetArray[inputLength - 1]) {
            var errs = this.state.allErrs + 1
            this.allErrs ++
            this.setState({

                allErrs: errs
            }, () => { console.log(this.state.allErrs) })
        }

        if (this.props.userInput.length === this.props.snippet.length || this.state.currentTime <= 0) {
            this.endTest()
        }

        this.WPMCalc(typingInstance, errs)
        this.CPMCalc()
        this.ACCCalc(errs)
    }
    // ----------------------------------------------------------------------------------
    // Fires after every keystroke launched by 'letterTest'
    // Calculates WPM based on the time started and this.allErrs 
    WPMCalc = (timerStarted, tempErrs) => {
        let totalChar = this.props.userInput.length
        let now = new Date()
        let typeinstance = now.getTime()
        let errs = (tempErrs - this.state.endErrs)
        let miniWPM = totalChar - errs;
        let timerBegin = timerStarted || this.state.testStart
        let timer = (typeinstance - timerBegin)
        let wpm = (miniWPM / 5) / (timer / 60000)

        wpm = Math.round(wpm)

        this.setState({ WPM: wpm })
    }
    // ----------------------------------------------------------------------------------
    // will multiply WPM by 5
    CPMCalc = () => {
        let cpm = Math.round(this.state.WPM * 5)

        this.setState({
            CPM: cpm
        })
    }
    // ----------------------------------------------------------------------------------
    // will calculate the accuracy based on the errs passed from 'lettersTest'
    ACCCalc = (errs) => {
        var totalChar = this.props.userInput.length
        var errors = (this.allErrs - this.state.endErrs) || errs || 0
        var numberCorrect = totalChar - (errors)

        var acc = numberCorrect / totalChar

        this.setState({
            ACC: acc * 100
        })
    }
    // ----------------------------------------------------------------------------------
    // Will fire only when the timer has reached 0, and/or if the length of the input is equal to the length of the snippet
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
    // ----------------------------------------------------------------------------------
    //  will calculate Efficiency based on speed and accuracy. heigher speed + heigher accuracy = higher efficiency.
    // fires only after 'endTest'
    DEMCalc = () => {
        let totalChar = this.props.userInput.length
        let miniACC = (totalChar - this.state.endErrs) / totalChar
        let dem = (this.state.WPM * this.state.ACC) * miniACC
        this.setState({
            DEM: dem
        })
    }
    // ----------------------------------------------------------------------------------

    render() {
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