import React, {Component} from 'react';

class Metrics extends Component {
    constructor(){
        super()
        this.allErrors = 0;
        this.endErrors = 0;
        this.currentTime = [];
        // this.timeToComplete = this.currentTime[this.currentTime.length -1] - this.currentTime[0]; 
        // debugger
        this.state = {
            WPM: 0,
            CPM: 0,
            ACC: 100,
            DEM: 0
        }
    }
// -----------------------------------------------------------------------
// will fire every time the props changes,
// invokes 'everyLetter' -- every time the props is not the same as it was last.
    componentDidUpdate(prevProps){
        if ( prevProps.userInputAscii !== this.props.userInputAscii){
            this.everyLetter()
        }
        
        this.WPMCalc(typingInstance, errs)
        this.CPMCalc()
        this.ACCCalc(errs)
    }
// -----------------------------------------------------------------------
// This will fire every time the props updates, called by 'componentDidUpdate'
// adds a new date number to the current time array
// if the 'userInputAscii' array length is the same as the 'snippetAscii' length A.K.A the snippet is over runs endOfSnippet and Toggles the toggleReadOnly prop from 'Typing.js'
// Otherwise, it checks the last element of the last element of the 'userInputAscii' array, and the corresponding element of the snippet array.
// Then runs WPM, CPM, and ACC
    everyLetter = () => {
        var date = new Date()
        var timeStamp = date.getTime()
        this.currentTime.push(timeStamp)

        if(this.props.userInputAscii.length === this.props.snippetAscii.length){
            this.endOfSnippet()
            this.props.toggleReadOnly()
        } else if( this.props.userInputAscii[this.props.userInputAscii.length - 1] !== this.props.snippetAscii[this.props.userInputAscii.length - 1]){
            this.allErrors++
        }
        this.WPM()
        this.CPM()
        this.ACC()
    }

// --------------------------------------------------------------------
// if the 'timeElapsed' is 0 aka if there is only one element. it will devide by one, as to not show infinity
// otherwise does the correct math.  (inputlength/5 - errors) / time elapsed.
// timeElapsed here is in milliseconds, devide first by 1000 for seconds, then by 60 for minutes.

    WPM = () => {
        var wpm;
        var timeElapsed = this.currentTime[this.currentTime.length -1] - this.currentTime[0]
        if(timeElapsed === 0){
            wpm = ((this.props.userInputAscii.length/5) - this.allErrors) / 1
        }else {
             wpm = (((this.props.userInputAscii.length/5) - this.allErrors) / ((timeElapsed) / 60000))
        }
            debugger
        this.setState({
            WPM: Math.round(wpm)
        })
        // debugger
    }
// --------------------------------------------------------------------
// is invoked by 'everyLetter' calculates Characters per minute
// all characters / time lapsed
    CPM = () => {
        var cpm;
        var timeElapsed = (this.currentTime[this.currentTime.length -1] - this.currentTime[0])
        if(timeElapsed === 0){
            cpm = (this.props.userInputAscii.length / (1))
        } else {
            cpm = (this.props.userInputAscii.length / ((timeElapsed) / 60000))
        }

            this.setState({
                CPM: Math.round(cpm)
            })
    }

// --------------------------------------------------------------------
// if there is only one item in the array, it uses a number 1
// otherwise charLength - errors / charLength
    ACC = () => {
        var acc;
        if(this.props.userInputAscii.length!==this.props.snippetAscii.length){
            acc =(this.props.userInputAscii.length - this.allErrors)/this.props.userInputAscii.length
        } else if (this.props.userInputAscii.length === this.props.snippetAscii.length){
            acc =(this.props.userInputAscii.length - this.endErrors)/this.props.userInputAscii.length
        }
            this.setState({
                ACC:Math.round(acc * 100)
            })
        // debugger
    }

// --------------------------------------------------------------------
// WPM - errors * ACC
    DEM = () => {
        var dem = (this.state.WPM - this.allErrors) * this.state.ACC
            this.setState({
                DEM: Math.round(dem)
            })
    }
// --------------------------------------------------------------------
// will run every time the length of the userInput array is the same as the length of the snippet
// checks each item again against the snipppet array, and adds one to 'endErrors' then the compares them to the allErrors to find the corrected errors
// then runs WPM, CPM and ACC one last time. then runs the DEM once.
    endOfSnippet = () => {
        for(let i = 0; i <= this.props.userInputAscii; i++){
            if(this.props.userInputAscii[i] !== this.props.snippetAscii[i]){
                this.endErrors++
            } 
        }
        
        this.WPM();
        this.CPM();
        this.ACC();
        this.DEM();
    }


    render() {
        console.log(this.props.userInputAscii)
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