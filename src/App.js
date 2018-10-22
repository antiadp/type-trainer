import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import Typing from './Components/Typing/Typing';
import SideNav from './Components/SideNav/SideNav';
import { slide as Menu } from 'react-burger-menu';
import GoBack from './Components/GoBack'
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
      <GoBack/>
        <Menu dispableOverlayClick >
          <SideNav setLanguage={this.setLanguage} timer={this.state.timer}/>
        </Menu>
        <Typing language = {this.state.language} />
      </div>
    );
  }
}

export default App;
