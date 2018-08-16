import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { getTestResults } from './ducks/reducer';
import Typing from './Components/Typing/Typing';
import SideNav from './Components/SideNav/SideNav';

class App extends Component {
	constructor() {
		super();
		this.state = {
			menu: true,
			language: 'HTML',
			loggedIn: false,
			timer: 60
		};
	}
	componentDidMount = () => {
		axios
			.get('/api/all-results')
			.then((testResults) => {
				console.log('testResults from db', testResults.data);
				this.props.getTestResults(testResults.data);
			})
			.catch((error) => console.log('Oi! Somethings gone wrong!', error));
	};
	tempChangeLogin = () => {
		this.setState({
			loggedIn: !this.state.loggedIn
		});
	};
	setLanguage = (e) => {
		this.setState({ language: e });
	};
	render() {
		return (
			<div className="App">
				<button
					style={
						this.state.menu ? (
							{ 'text-align': 'left', position: 'absolute', left: 'calc(20% + 5px)' }
						) : (
							{ 'text-align': 'left', position: 'absolute', left: '5px' }
						)
					}
					onClick={() => {
						this.setState({ menu: !this.state.menu });
					}}
				>
					Toggle Menu
				</button>
				{this.state.menu ? (
					<SideNav
						setLanguage={this.setLanguage}
						loggedIn={this.state.loggedIn}
						tempChangeLogin={this.tempChangeLogin}
						timer={this.state.timer}
					/>
				) : (
					<div />
				)}
				<Typing />
				<h2 className="script">{this.state.language}</h2>
			</div>
		);
	}
}

export default connect(null, { getTestResults })(App);
