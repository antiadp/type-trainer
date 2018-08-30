import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';
import { getUser, removeUser } from './../../ducks/reducer';
import Modal from 'react-responsive-modal';
import Profile from './../Profile/Profile';

class SideNav extends Component {
	constructor() {
		super();
		this.state = {
			open: false,
			username: '',
			password: '',
			loggedIn: false,
			leaderBoardRes: [],
			profile: false
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
	showProfile = () => {
		this.setState({ profile: !this.state.profile });
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
				<div className="nav-leaders" key={user.test_id}>
					<img src={user.img} className="nav-leaders-img" alt="user" />
					<div className="nav-leaders-info">
						<h3>{user.username}</h3>
						<h4>
							WPM: {user.wpm}  CPM: {user.cpm}  Acc: {user.accuracy}
						</h4>
					</div>
				</div>
			);
		});
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
						<div className="nav-user-profile" onClick={this.showProfile}>
							<h3>Hello {user.username}!</h3>
							<img src={user.img} className="nav-user-profile-img" alt="user" />
						</div>
					)}


					<Profile show={this.state.profile} close={this.showProfile} />
					<Modal
						open={this.state.open}
						onClose={this.hideLoginModal}
						classNames={{ modal: 'custom-modal' }}
						center
						>
						<div className="side-nav-login-modal">

							<div className="login-input">
								<label for="inp" class="inp">
									<input
										onChange={(e) => this.handleUsernameChange(e.target.value)}
										placeholder="&nbsp;"
										class="loginReg-username-input"
										type="text"
										id="inp1"
										/>
									<span class="label">Username</span>
									<span class="border"></span>
								</label>	

								<label for="inp" class="inp">
									<input
										onChange={(e) => this.handlePasswordChange(e.target.value)}
										placeholder="&nbsp;"
										class="loginReg-password-input"
										type="password"
										id="inp2"
										/>
									<span class="label">Password</span>
									<span class="border"></span>
								</label>
							</div>

							<div className="modal-btn">
								<button onClick={this.handleLoginRegRequest}
												className="modal-btn-login">
												Login / Register</button>
							</div>

						</div>
					</Modal>
				</div>

				<div className="script-wrapper">
				<hr/>
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
					<hr/>
				</div>
				<div className="nav-leader-board-wpr">
					<h1>LEADERBOARD</h1>
					{leaderBoard}
				</div>
				{user.user_id && (
					<div className="logout">
						<button onClick={this.logout} className="logout-button">Logout</button>
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
