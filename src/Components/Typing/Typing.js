import React, {Component} from 'react';
import Metrics from '../Metrics/Metrics';
import Charts from '../Charts/Charts';
import axios from 'axios'

class Typing extends Component{
    constructor(props){
        super()
        this.state ={
            WPM:8,
            CPM:40,
            ACC:'100%',
            timer:60,
            placeholder:`Change log: when timer is 60, text input is disabled. login changes + logout appears, Menu Toggles, Script type changes with click, Mouse is now always default when over text.`,
            userInput: '',
            asciiArray: [],
            lettersArray: []
        }

        this.updateUserInput = this.updateUserInput.bind(this)
    }

    componentDidMount(){
        axios.get('/api/get-snippet').then(res => {
            console.log(res, 'front end res')
            let snippet = res.data[0].snippet;
            let snippetArray = snippet.split(',').map((current) => {
                return Number(current)
            })

            let lettersArray = [];

            for(let i = 0; i < snippetArray.length; i++){
                lettersArray.push(String.fromCharCode(snippetArray[i]))
                console.log(String.fromCharCode(snippetArray[i]))
            }

            console.log(lettersArray, 'lettersArray')

            this.setState({
                lettersArray: lettersArray
            })
        })
    }

    updateUserInput(value){

        let tempArray = []

        for(let i = 0; i < value.length; i++){
            tempArray.push(value.charCodeAt(i))
          }
          
          let asciiArray = tempArray.toString() 
          console.log('asciiArray', asciiArray)
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
                <textarea onChange={(e) => {this.updateUserInput(e.target.value)}} data-gramm_editor="false" autoComplete='off' spellCheck='false' name="Main Typing input" id="text-input" cols="30" rows="10" placeholder = {this.state.placeholder} maxLength='500' readOnly={this.state.timer!==0?false:true} value={this.state.lettersArray}/>
                {/* </textarea> */}

                

                
                <Charts/>
            </div>
        )
    }
}
export default Typing

