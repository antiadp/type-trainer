import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';
import Login from './../Login/Login';
import { getTestResults, getUser } from './../../ducks/reducer';

class SideNav extends Component {
	constructor() {
		super();
		this.state = {
			login: false
		};
	}

	componentDidMount = () => {
		if (this.props.testResults.length === 0) {
			axios
				.get('/api/all-results')
				.then((testResults) => {
					console.log('testResults from db', testResults.data);
					this.props.getTestResults(testResults.data);
				})
				.catch((error) => console.log('Oi! Somethings gone wrong!', error));
        }
        if(this.props.user.length === 0){
            axios.get('/api/user-data').then(currentUser => {
                this.props.getUser(currentUser.data);
            })
        }
	};

	setLanguage = (e) => {
		this.props.setLanguage(e);
	};
	tempChangeLogin = () => {
		this.props.tempChangeLogin();
	};
	showLoginModal = () => {
		this.setState({ login: true });
	};
	hideLoginModal = () => {
		this.setState({ login: false });
	};
	logout = () => {
		axios.get('/api/logout').then((res) => {
			if (res.data) {
				return swal({
					title: 'Logged out!',
					text: 'Come back soon!',
					icon: 'success',
					button: 'Cool!'
				});
			} else {
				return swal({
					title: 'Error',
					text: 'Something went wrong...try again',
					icon: 'error',
					button: 'Oops!'
				});
			}
		});
	};
	render() {
		const { testResults, user } = this.props;
		console.log('current user', user);
		let leaderBoard = testResults.map((user) => {
			return (
				<div key={user.test_id}>
					<img
						style={{ width: '50px', height: '50px', borderRadius: '25px', backgroundColor: 'blue' }}
						src={user.img}
						alt="user"
					/>
					<h4>{user.username}</h4>
					<h4>
						wpm:{user.wpm} cpm:{user.cpm} accuracy:{user.accuracy}
					</h4>
				</div>
			);
		});
		return (
			<div className="nav-wrapper">
				<div className="login">
					{!user.user_id && (
						<button id="login-button" onClick={this.showLoginModal}>
							Login / Register
						</button>
					)}
					<Login
						show={this.state.login}
						handleClose={this.hideLoginModal}
						style={{ width: '100%', height: '100vh' }}
					>
						<h1>Please enter a username and password</h1>
					</Login>
				</div>

				<div className="script-wrapper">
					<h4
						onClick={() => {
							this.setLanguage('HTML');
						}}
						className="script"
					>
						HTML
					</h4>
					<h4
						onClick={() => {
							this.setLanguage('CSS');
						}}
						className="script"
					>
						CSS
					</h4>
					<h4
						onClick={() => {
							this.setLanguage('JavaScript');
						}}
						className="script"
					>
						JavaScript
					</h4>
					<h4
						onClick={() => {
							this.setLanguage('Special');
						}}
						className="script"
					>
						Special
					</h4>
				</div>
				<div className="nav-leader-board">
					<h1>LEADERBOARD</h1>
					{leaderBoard}
				</div>
				{user.user_id ?
					<div className="logout">
						<button onClick={this.logout}>Logout</button>
					</div> : ''
				}
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		testResults: state.results,
		user: state.user
	};
};

export default connect(mapStateToProps, { getTestResults, getUser })(SideNav);
