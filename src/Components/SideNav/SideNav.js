import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';
import { getUser, removeUser } from './../../ducks/reducer';
import Modal from 'react-responsive-modal';

class SideNav extends Component {
	constructor() {
		super();
		this.state = {
			open: false,
			username: '',
			password: '',
			loggedIn: false,
			leaderBoardRes: []
		};
	}

	componentDidMount = () => {
		axios
			.get('/api/all-results')
			.then((testResults) => {
				this.setState({ leaderBoardRes: testResults.data });
			})
			.catch((error) => console.log('Oi! Somethings gone wrong!', error));
		if (!this.props.user.user_id) {
			axios.get('/api/user-data').then((userOnSesh) => this.props.getUser(userOnSesh.data));
		}
	};
	handleUsernameChange = (val) => {
		this.setState({ username: val });
	};

	handlePasswordChange = (val) => {
		this.setState({ password: val });
	};

	handleLoginRegRequest = () => {
		const { username, password } = this.state;
		const img = `https://robohash.org/${username}`;
		axios.post('/api/new-user', { username, password, img }).then((newUser) => {
			this.props.getUser(newUser.data);
			swal({
				title: 'Success!',
				text: 'Now get typing!',
				icon: 'success',
				button: 'Cool!'
			});
			this.hideLoginModal();
		});
	};

	setLanguage = (e) => {
		this.props.setLanguage(e);
	};

	showLoginModal = () => {
		this.setState({ open: true });
	};

	hideLoginModal = () => {
		this.setState({ open: false, loggedIn: !this.state.loggedIn });
	};

	logout = () => {
		axios.get('/api/logout').then(() => {
			swal({
				title: 'Logged out!',
				text: 'Come back soon!',
				icon: 'success',
				button: 'Cool!'
			});
			this.props.removeUser();
			this.setState({ loggedIn: !this.state.loggedIn });
		});
	};

	render() {
		const { user } = this.props;
		let leaderBoard = this.state.leaderBoardRes.map((user) => {
			return (
				<div key={user.test_id}>
					<img src={user.img} alt="user" />
					<h4>{user.username}</h4>
					<h4>
						wpm:{user.wpm} cpm:{user.cpm} accuracy:{user.accuracy}
					</h4>
				</div>
			);
		});
		// console.log("leaderboard restult", leaderBoard)
		return (
			<div className="nav-wrapper">
				<div className="login">
					{!user.user_id && (
						<div>
							<button id="login-button" onClick={this.showLoginModal}>
								Login / Register
							</button>
						</div>
					)}
					{user.user_id && (
						<div>
							<h3>Hello {user.username}</h3>
							<img src={user.img} alt="user" />
						</div>
					)}
					<Modal
						open={this.state.open}
						onClose={this.hideLoginModal}
						classNames={{ modal: 'custom-modal' }}
						center
					>
						<div className="side-nav-login-modal">
							<div className="login-input">
								<input
									onChange={(e) => this.handleUsernameChange(e.target.value)}
									placeholder="username"
									className="loginReg-username-input"
									type="text"
								/>
							</div>
							<div className="login-input">
								<input
									onChange={(e) => this.handlePasswordChange(e.target.value)}
									placeholder="password"
									className="loginReg-password-input"
									type="password"
								/>
							</div>
							<div className="modal-btn">
								<button onClick={this.handleLoginRegRequest}>Login / Register</button>
							</div>
							<div className="modal-btn">
								<button onClick={this.hideLoginModal}>Cancel</button>
							</div>
						</div>
					</Modal>
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
				{user.user_id && (
					<div className="logout">
						<button onClick={this.logout}>Logout</button>
					</div>
				)}
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

export default connect(mapStateToProps, { getUser, removeUser })(SideNav);
