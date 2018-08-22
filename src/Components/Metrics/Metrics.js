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

    componentDidUpdate(prevProps){
        if ( prevProps.userInputAscii !== this.props.userInputAscii){
            this.everyLetter()
        }
    }

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

    WPM = () => {
        // check multiplying by 60000 for wpm computation ??
        var wpm;
        var timeElapsed = this.currentTime[this.currentTime.length -1] - this.currentTime[0]
        if(timeElapsed === 0){
            wpm = ((this.props.userInputAscii.length/5) - this.allErrors) / 1
        }else {
            var wpm = (((this.props.userInputAscii.length/5) - this.allErrors) / ((timeElapsed) / 60000))
        }
            debugger
        this.setState({
            WPM: Math.round(wpm)
        })
        // debugger
    }

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
    DEM = () => {
        var dem = (this.state.WPM - this.allErrors) * this.state.ACC
            this.setState({
                DEM: Math.round(dem)
            })
    }

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