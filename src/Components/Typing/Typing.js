import React, { Component } from 'react';
import Metrics from '../Metrics/Metrics';
import Charts from '../Charts/Charts';
import axios from 'axios'

class Typing extends Component {
    constructor(props) {
        super()
        this.state = {
            input: '',
            asciiArray: [32],
            lettersArray: [' '],
            timerBool: false,
        }
    }
    // ----------------------------------------------------------------------------------


    // When component mounts, will make a request for a snippet, will split the array, and turn each element from ascii to readable
    //Will then set state with that array.
    componentDidMount() {
        axios.get('/api/get-snippet').then(res => {
            let snippet = res.data[0].snippet;
            let lettersArray = [];
            let snippetArray = snippet.split(',').map((current) => {
                return Number(current)
            })

            for (let i = 0; i < snippetArray.length; i++) {
                lettersArray.push(String.fromCharCode(snippetArray[i]))
            }

            this.setState({
                lettersArray: lettersArray
            })
        })
    }
    // ----------------------------------------------------------------------------------
    // will fire every time a key is pressed. setting state with the input value.
    // will fire ONLY if 'timerBool' is true;
    // also sets the input to an ascii array.
    updateUserInput = (value) => {
        if (!this.state.timerBool) {
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
            // we may have to pass ascii array instead of the letters array.
            // we may want to pass asciiArray compare the input ascii against the ascii on the backend
        }
    }
    // ----------------------------------------------------------------------------------
    // when fired function will clear the input and the ascii Array on state
    clearMe = () => {
        this.setState({
            input: '',
            asciiArray: ''
        })
    }
    // ----------------------------------------------------------------------------------
    // Toggles the read only property on the textArea box.  passed through props to 'Metrics' and fired on 'Metrics.js'
    // fired by 'Metrics' when the timer reaches 0
    toggleReadOnly = () => {
        console.log('fired')
        this.setState({
            timerBool: true
        })
    }
    // ----------------------------------------------------------------------------------

    render() {
        let joined = this.state.lettersArray.join('')
        let input = this.state.input
        return (

            <div className='typing-wrapper'>
                <Metrics
                    userInput={input}
                    snippet={joined}
                    toggleReadOnly={this.toggleReadOnly}
                />

                <textarea
                    value={this.state.input}
                    onChange={(e) => { this.updateUserInput(e.target.value) }}
                    data-gramm_editor="false"
                    autoComplete='off'
                    spellCheck='false'
                    name="Main Typing input"
                    id="text-input" cols="30"
                    rows="10"
                    placeholder={this.state.placeholder}
                    maxLength='500' readOnly={this.state.timerBool}
                    onCopy={this.clearInput}
                    onDrag={this.clearInput}
                    onDrop={this.clearInput}
                    onPaste={this.clearInput}
                />

                <div className="display-wrapper">
                    <div className="DisplayText">
                        <p id='snippetDisplay'>{this.state.lettersArray}</p>
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
