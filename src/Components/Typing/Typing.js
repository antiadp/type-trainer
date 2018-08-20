
import React, { Component } from 'react';
import Metrics from '../Metrics/Metrics';
import Charts from '../Charts/Charts';
import DisplayText from '../DisplayText/DisplayText'
import MetricsModal from '../MetricsModal/MetricsModal'
import axios from 'axios'

class Typing extends Component {
    constructor(props) {
        super()
        this.state = {
            WPM: 8,
            CPM: 40,
            ACC: 100,
            timer: 5,
            // placeholder: `Change log: timer now works on start of typing, and pasting is not allowed.`,
            timerBool: false,
            input: '',
            asciiArray: [],
            lettersArray: []
        }
    }

    everySecond = () => {
        console.log(this.state.timer)
        this.setState({
            timer: this.state.timer - 1
        })
        this.startTimer()
    }
    startTimer = () => {
        console.log('clicked')
        if (this.state.timer > 0) {
            setTimeout(this.everySecond, 1000)
        }
    }

    componentDidMount() {
        axios.get('/api/get-snippet').then(res => {
            console.log(res, 'front end res')
            let snippet = res.data[0].snippet;
            let snippetArray = snippet.split(',').map((current) => {
                return Number(current)
            })

            let lettersArray = [];

            for (let i = 0; i < snippetArray.length; i++) {
                lettersArray.push(String.fromCharCode(snippetArray[i]))
                // console.log(String.fromCharCode(snippetArray[i]))
            }

            // console.log(lettersArray, 'lettersArray')

            this.setState({
                lettersArray: lettersArray
            })
        })
    }



    updateUserInput = (value) => {
        if (this.state.timer === 0) {
            console.log('hello, i\'m finished')
            this.setState({
                timerBool: true,
            })
            // this.deselectTypeBox()
        }
        this.setState({
            input: value
        })
        if (this.state.input.length === 1) {
            this.startTimer()
        }

        let tempArray = []
        for (let i = 0; i < value.length; i++) {
            tempArray.push(value.charCodeAt(i))
        }

        let asciiArray = tempArray.toString()
        // console.log('asciiArray', asciiArray)
        this.setState({
            asciiArray: asciiArray,
        })
    }
    // deselectTypeBox = () => {

    // }
    clearMe = () => {
        console.log('No pasting allowed')
        this.setState({
            input: '',
            asciiArray: ''
        })
    }
    clearInput = () => {
        setTimeout(this.clearMe, 100)
        return false
    }
    startNewTest = () =>{
        this.setState({
            //set timer back to what it was, 
            //set the timerBool to what it wasn't !timerBool
            timerBool:!this.state.timerBool
        })
    }
    render() {
        return (
            <div className='typing-wrapper'>
 {this.state.timerBool?<MetricsModal ACC={this.state.ACC} WPM={this.state.WPM} CPM={this.state.CPM} startNewTest={this.startNewTest}/>:<div></div>} 

                <Metrics
                    WPM={this.state.WPM}
                    CPM={this.state.CPM}
                    ACC={this.state.ACC}
                    timer={this.state.timer}
                />
                {/* <textarea data-gramm_editor="false" autoComplete='off' spellCheck='false' name="Main Typing input" id="text-input" cols="30" rows="10" placeholder = {this.state.placeholder} maxLength='500' readOnly={this.state.timer === 0? true:false} onChange={(e)=>{this.updateState(e.target.value)}} /> */}
                {/* <br/> */}
                {/* <button onClick={this.startTimer}>Start timer</button> */}
                {/* <br/> */}
                {/* value={this.state.input} */}
                <textarea value={this.state.input} onChange={(e) => { this.updateUserInput(e.target.value) }} data-gramm_editor="false" autoComplete='off' spellCheck='false' name="Main Typing input" id="text-input" cols="30" rows="10" placeholder={this.state.placeholder} maxLength='500' readOnly={this.state.timer !== 0 ? false : true} onCopy={this.clearInput} onDrag={this.clearInput} onDrop={this.clearInput} onPaste={this.clearInput} />
                <DisplayText>
                    {this.state.lettersArray}
                </DisplayText>
                <br />
                <br />
                {/* </textarea> */}


                <Charts />
            </div>
        )
    }
}
export default Typing;
