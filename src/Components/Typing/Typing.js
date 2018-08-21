import React, { Component } from 'react';
import Metrics from '../Metrics/Metrics';
import Charts from '../Charts/Charts';
import axios from 'axios'

class Typing extends Component {
    constructor(props) {
        super()
        this.state = {

            input: '',
            asciiArray: [65],
            lettersArray: ['A'],
            timerBool:false,
        }
    }



    componentDidMount() {
        axios.get('/api/get-snippet').then(res => {
            let snippet = res.data[24].snippet;
            let snippetArray = snippet.split(',').map((current) => {
                return Number(current)
            })

            let lettersArray = [];

            for (let i = 0; i < snippetArray.length; i++) {
                lettersArray.push(String.fromCharCode(snippetArray[i]))
            }


            this.setState({
                lettersArray: lettersArray
            })
        })
    }



    updateUserInput = (value) => {
        if(!this.state.timerBool){
            this.setState({
            input: value
        })
        let tempArray = []
        for (let i = 0; i < value.length; i++) {
            tempArray.push(value.charCodeAt(i))
        }
        
        let asciiArray = tempArray.toString()
        this.setState({
            asciiArray: asciiArray,
        })
    }
    }

    clearMe = () => {
        console.log('No pasting allowed')
        this.setState({
            input: '',
            asciiArray: ''
        })
    }
    toggleReadOnly = () =>{
        console.log('fired')
        this.setState({
            timerBool:true
        })
    }

    render() {
        console.log('snippet',this.state.lettersArray)
        let joined = this.state.lettersArray.join('')
        let input = this.state.input
        // console.log('ACC',this.state.ACC)
        return (

            <div className='typing-wrapper'>

                <Metrics
                    userInput={input}
                    snippet={joined}
                    toggleReadOnly={this.toggleReadOnly}

                />

                <textarea value={this.state.input} onChange={(e) => { this.updateUserInput(e.target.value) }} data-gramm_editor="false" autoComplete='off' spellCheck='false' name="Main Typing input" id="text-input" cols="30" rows="10" placeholder={this.state.placeholder} maxLength='500' readOnly={this.state.timerBool} onCopy={this.clearInput} onDrag={this.clearInput} onDrop={this.clearInput} onPaste={this.clearInput} />
           
                <div className="display-wrapper">
                    <div className="DisplayText">
                        <p id= 'snippetDisplay'>{this.state.lettersArray}</p>
                            
                    </div>
                </div>
                <br />
                <br />



                <div className="charts">
                    <Charts />
                </div>
            </div>
        )
    }
}
export default Typing;
