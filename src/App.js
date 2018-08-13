import React, { Component } from 'react';
// import logo from './logo.svgimport './App.css';
import Metrics from './components/Metrics'
import SideNav from './components/SideNav'
import Header from './components/Header'

class App extends Component {
  
  render() {
  var temp = 'This is the temporary <text></text>'
    return (
      <div className="App">
        <Header/>
        <SideNav style={{position:'relative', left:'0px'}}/>
        <Metrics/>
        <textarea placeholder = {temp}name="Type" id="type" cols="60" rows="20" style={{ width: '500px' }}></textarea>
      </div>
    );
  }
}

export default App;
