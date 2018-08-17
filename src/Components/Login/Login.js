import React, { Component } from 'react';
import swal from 'sweetalert';
import {connect} from 'react-redux';
import axios from 'axios';
import {getUser} from './../../ducks/reducer';
import PropTypes from 'prop-types';
import './Login.css';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: ''
		};

		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleLoginRegRequest = this.handleLoginRegRequest.bind(this);
	}

	handleUsernameChange(val) {
		this.setState({ username: val });
	}

	handlePasswordChange(val) {
		this.setState({ password: val });
	}

	handleLoginRegRequest() {
        const {username, password} = this.state;
        const img = `https://robohash.org/${username}`;
        axios.post('/api/new-user', {username, password, img}).then(newUser => {
            console.log('new user front end', newUser.data)
            this.props.getUser(newUser.data)
        })
        this.setState({username: '', password: ''})
        this.props.handleClose()
        swal({
            title: "User created!",
            text: "Now get typing!",
            icon: "success",
            button: "Cool!",
        });
    }

	render() {
		// Render nothing if the "show" prop is false
		if (!this.props.show) {
			return null;
		}
		// The gray background
		const backdropStyle = {
			position: 'fixed',
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			backgroundColor: 'rgba(0,0,0,0.3)',
			padding: 50
		};

		// The modal "window"
		const modalStyle = {
			backgroundColor: '#fff',
			borderRadius: 5,
			maxWidth: '900px',
			minHeight: '300px',
			margin: '0 auto',
			padding: 30
		};
		return (
			<div className="backdrop" style={{ backdropStyle }}>
				<div className="modal" style={{ modalStyle }}>
					{this.props.children}
					<div className="loginReg-container">
						<div className="loginReg-username">
							<input
								onChange={(e) => this.handleUsernameChange(e.target.value)} placeholder="username"
								className="loginReg_username-input"
								type="text"
							/>
						</div>

						<div className="loginReg-password">
							<input
								onChange={(e) => this.handlePasswordChange(e.target.value)} placeholder="password"
								className="loginReg-password-input"
								type="text"
							/>
						</div>

						<div>
							<button onClick={this.handleLoginRegRequest} className="loginReg-btn">
								Login / Register
							</button>
						</div>
					</div>

					<div className="footer">
						<button onClick={this.props.handleClose}>Close</button>
					</div>
				</div>
			</div>
		);
	}
}
Login.propTypes = {
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
  };

export default connect(null, {getUser})(Login);
