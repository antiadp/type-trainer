import React, { Component } from 'react';
// import logo from './logo.svgimport './App.css';
import Metrics from './components/Metrics'
import SideNav from './components/SideNav'
import Header from './components/Header'
import Pool from './components/Pool'

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentPool: 'Here',
      // poolArray:()=>{return this.state.currentPool.split('')},
      inputText: 'hello',
      // textArray:()=>{return this.setState.inputText.split('')}
    }
  }
  // stateToArray=()=>{
  //   // console.log('this ran')
  //   this.setState({poolArray:this.state.currentPool.split(''),
  //   textArray:this.state.inputText.split('')
  //   })
  // }
  updateState = (e) => {

    // this.stateToArray()
    this.setState({
      inputText: e
    })

  }


  render() {
    // this.checkInput()
    var temp = 'This is the temporary <text></text>'
    return (
      <div className="App">
        <Header />
        <SideNav style={{ position: 'relative', left: '0px' }} />
        <Metrics />
        <Pool>
          {this.state.currentPool}
        </Pool>

        <textarea placeholder={temp} name="Type" id="type" cols="60" rows="20" style={{ width: '500px' }} onChange={(e) => {this.updateState(e.target.value)}}></textarea>
        <br />
        {this.state.inputText}

      </div>
    );
  }
}

export default App;
