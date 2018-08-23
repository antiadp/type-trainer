import React, {Component} from 'react';

class Metrics extends Component {
    constructor(){
        super()
        this.allErrors = 0;
        this.endErrors = 0;
        this.currentTime = [];
        this.timeToComplete = this.currentTime[this.currentTime.length -1] - this.currentTime[0]; 

        this.state = {
            WPM: 0,
            CPM: 0,
            ACC: 100,
            DEM: 0
        }
    }

    componentDidUpdate(prevProps){
        if ( prevProps.userInput !== this.props.userInput){
            this.everyLetter()
        }
    }

    everyLetter = () => {
        var date = new Date()
        var timeStamp = date.getTime()
        this.currentTime.push(timeStamp)

        if(this.props.userInput.length === this.props.snippetArray.length){
            this.endOfSnippet()
        } else if( this.props.userInput[this.props.userInput.length - 1] !== this.props.snippetArray[this.props.userInput.length - 1]){
            this.allErrors++
        }
        this.WPM()
        this.CPM()
        this.ACC()
    }

    WPM = () => {
        // check multiplying by 60000 for wpm computation ??
        var wpm = (((this.props.userInput.length/5) - this.allErrors) / (this.timeToComplete / 60000))
        
        this.setState({
            WPM: Math.round(wpm)
        })
    }

    CPM = () => {
        var cpm = (this.props.userInput.length / (this.timeToComplete / 60000))
            this.setState({
                CPM: Math.round(cpm)
            })
    }
    ACC = () => {
        var acc;
        if(this.props.userInput.length!==this.props.snippetArray.length){
            acc =(this.props.userInput.length - this.allErrors)/this.props.userInput.length
        } else if (this.props.userInput.length === this.props.snippetArray.length){
            acc =(this.props.userInput.length - this.endErrors)/this.props.userInput.length
        }
            this.setState({
                ACC:Math.round(acc * 100)
            })
    }
    DEM = () => {
        var dem = (this.state.WPM - this.allErrors) * this.state.ACC
            this.setState({
                DEM: Math.round(dem)
            })
    }

    endOfSnippet = () => {
        for(let i = 0; i <= this.props.userInput; i++){
            if(this.props.userInput[i] !== this.props.snippetArray[i]){
                this.endErrors++
            } 
        }
        this.WPM();
        this.CPM();
        this.ACC();
        this.DEM();
    }
}