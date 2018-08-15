import React, {Component} from 'react';
import Metrics from '../Metrics/Metrics';
import Charts from '../Charts/Charts';

class Typing extends Component{
    constructor(props){
        super()
        this.state ={
            WPM:8,
            CPM:40,
            ACC:'100%',
            timer:60,
            placeholder:`Change log: when timer is 60, text input is disabled. login changes + logout appears, Menu Toggles, Script type changes with click, Mouse is now always default when over text.`

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
                <textarea data-gramm_editor="false" autoComplete='off' spellCheck='false' name="Main Typing input" id="text-input" cols="30" rows="10" placeholder = {this.state.placeholder} maxLength='500' readOnly={this.state.timer!==0?false:true}/>
                {/* </textarea> */}
                <Charts/>
            </div>
        )
    }
}
export default Typing

