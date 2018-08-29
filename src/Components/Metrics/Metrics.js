                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        import React, { Component } from 'react';

class Metrics extends Component {
    constructor() {
        super()
        this.allErrors = 0;
        this.endErrors = 0;
        this.currentTime = [];
        // this.timeToComplete = this.currentTime[this.currentTime.length -1] - this.currentTime[0]; 
        // debugger
        this.WPMArray = []
        this.ACCArray = []
        this.state = {
            WPM: 0,
            CPM: 0,
            ACC: 100,
            DEM: 0
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userInputAscii !== this.props.userInputAscii) {
            this.everyLetter()
        }
        if (prevProps.snippetAscii !== this.props.snippetAscii) {
            this.setState({                                                                                 
                WPM: 0,
                CPM: 0,
                ACC: 100,
                DEM: 0,
            })
            this.allErrors = 0;
            this.endErrors = 0;
            this.currentTime = [];
        }
    }

    everyLetter = () => {
        var date = new Date()
        var timeStamp = date.getTime()
        this.currentTime.push(timeStamp)

        if (this.props.userInputAscii.length === this.props.snippetAscii.length) {
            this.endOfSnippet()
            this.props.toggleReadOnly()
        } else if (this.props.userInputAscii[this.props.userInputAscii.length - 1] !== this.props.snippetAscii[this.props.userInputAscii.length - 1]) {
            this.allErrors++
        }
        this.WPM()
        this.CPM()
        this.ACC()
    }

    WPM = () => {
        // check multiplying by 60000 for wpm computation ??
        var wpm;
        var timeElapsed = this.currentTime[this.currentTime.length - 1] - this.currentTime[0]
        var minutesElapsed = timeElapsed / 60000
        if (timeElapsed === 0) {
            wpm = ((this.props.userInputAscii.length / 5) - this.allErrors) / 1
        } else {
            wpm = (((this.props.userInputAscii.length - this.allErrors) / 5) / ((minutesElapsed)))
        }
        if (this.props.userInputAscii.length === this.props.snippetAscii.length) {
        }
        if(wpm.isNaN || wpm === Infinity || wpm === -Infinity || wpm <=0){
            // console.log('wpm1',wpm)
            wpm = 0
            // console.log('wpm2',wpm)
        }
        this.setState({
            WPM: Math.round(wpm)
        })
        this.WPMArray.push(wpm)

    }

    CPM = () => {
        var cpm;
        var timeElapsed = (this.currentTime[this.currentTime.length - 1] - this.currentTime[0])
        if (timeElapsed === 0) {
            cpm = (this.props.userInputAscii.length / (1))
        } else {
            cpm = (this.props.userInputAscii.length / ((timeElapsed) / 60000))
        }

        this.setState({
            CPM: Math.round(cpm)
        })
    }
    ACC = () => {
        var acc;
        if (this.props.userInputAscii.length !== this.props.snippetAscii.length) {
            acc = (this.props.userInputAscii.length - this.allErrors) / this.props.userInputAscii.length
        } else if (this.props.userInputAscii.length === this.props.snippetAscii.length) {
            acc = (this.props.userInputAscii.length - this.endErrors) / this.props.userInputAscii.length
        }
        if(acc.isNaN || acc === Infinity || acc === -Infinity || acc <= 0){
            // console.log('acc1', acc)
            acc = 0
            // console.log('acc2', acc)
        }
        this.setState({
            ACC: Math.round(acc * 100)
        })
        this.ACCArray.push(acc)

    }
    DEM = () => {
        var dem = (this.state.WPM - this.allErrors) * this.state.ACC
        return Math.round(dem)

    }

    endOfSnippet = () => {
        
        console.log('end of snippet before for loop')
        // debugger
        // 
        for (let i = 0; i <= this.props.userInputAscii.length; i++) {
            // console.log(i)
            // debugger
            if (this.props.userInputAscii[i] !== this.props.snippetAscii[i]) {
                // console.log(this.props.userInputAscii[i])
                this.endErrors++
                // console.log('endErrs',this.endErrors)
            } else {
                console.log('else statement')
            }

        }
        

        this.WPM();
        this.CPM();
        this.ACC();
        console.log('EndErrs after for loop',this.endErrors)
        this.passChartMetrics(this.DEM());

    }

    passChartMetrics = (dem) => {
        this.props.passChartMetrics(this.WPMArray, this.ACCArray, dem)
        // console.log('Metrics Passed')
    }


    render() {
        // console.log(this.props.userInputAscii)
        return (
            <div className="metrics-wrapper">
                <div className="WPM">
                    <h1 className='Metric'>{this.state.WPM}</h1>
                    <h4>WPM</h4>
                </div>
                <div className="CPM">
                    <h1 className='Metric'>{this.state.CPM}</h1>
                    <h4>CPM</h4>
                </div>
                <div className="ACC">
                    <h1 className='Metric'>{this.state.ACC}%</h1>
                    <h4>Accuracy</h4>
                </div>
            </div>
        )
    }
}
export default Metrics