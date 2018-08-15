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
            timer:60,
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
                   <textarea name="Main Typing input" id="text-input" cols="30" rows="10" placeholder = 'hello'></textarea>
                <Charts/>
            </div>
        )
    }
}
export default Typing

