import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import Typing from './Components/Typing/Typing';
import SideNav from './Components/SideNav/SideNav';
import { slide as Menu } from 'react-burger-menu';

class App extends Component {
  constructor() {
    super()
    this.state = {
      menu: true,
      language: 'HTML',
      timer: 60
    }
  }

  setLanguage = (e) => {
    this.setState({ language: e })
  }


  render() {
    return (
      <div className="App">
        {/* <button
          style={
            this.state.menu ? (
              { 'textAlign': 'left', position: 'absolute', left: 'calc(20% + 5px)', 'zIndex': 10 }
            ) : (
                { 'textAlign': 'left', position: 'absolute', left: '5px', 'zIndex': 10 }
              )
          }
          onClick={() => {
            this.setState({ menu: !this.state.menu });
          }}
        >
          Toggle Menu
				</button>
        {this.state.menu
          ? (<SideNav setLanguage={this.setLanguage} timer={this.state.timer} />)
          : (<div />)} */}
        <Menu noOverlay>
          <SideNav setLanguage={this.setLanguage} timer={this.state.timer}/>
        </Menu>
        <Typing language = {this.state.language} />
        {/* <h2 className="script">{this.state.language}</h2> */}
      </div>
    );
  }
}

export default App;
