import React, {Component} from 'react';
import Metrics from './Metrics'
import Charts from './Charts'

class Typing extends Component{
    constructor(props){
        super()
        this.state ={
            WPM:8,
            CPM:40,
            ACC:'100%',
            timer:5,
            placeholder:`Change log: when timer is 60, text input is disabled. login changes + logout appears, Menu Toggles, Script type changes with click, Mouse is now always default when over text.`,
            timerBool:false,
            input:''
        }
    }
 
    everySecond =() =>{
            console.log(this.state.timer)
            this.setState({
                timer:this.state.timer-1
            })
            this.startTimer()
        }

    startTimer = () =>{
        console.log('clicked')
        if(this.state.timer > 0){
            setTimeout(this.everySecond,1000)
        }

        if(this.state.timer === 0){
            console.log('hello, i\'m finished')
            this.setState({
                timerBool:true,
            })
            
        }
    }
    updateState = (e) =>{
        this.setState({
            input:e
        })
        if(this.state.input.length === 1){
            this.startTimer()
        }
    }

    render(){
        return(
            <div className = 'typing-wrapper'>
                <Metrics 
                WPM = {this.state.WPM}
                CPM = {this.state.CPM}
                ACC = {this.state.ACC}
                timer = {this.state.timer}
                />
                <textarea data-gramm_editor="false" autoComplete='off' spellCheck='false' name="Main Typing input" id="text-input" cols="30" rows="10" placeholder = {this.state.placeholder} maxLength='500' readOnly={this.state.timer === 0? true:false} onChange={(e)=>{this.updateState(e.target.value)}} />
                <br/>
                {/* <button onClick={this.startTimer}>Start timer</button> */}
                <br/>
                {this.state.input}
                <Charts/>
            </div>
        )
    }
}
export default Typing

