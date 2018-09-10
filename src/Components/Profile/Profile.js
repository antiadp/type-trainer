import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser, getUserResults } from './../../ducks/reducer';
import Modal from 'react-responsive-modal';
import Charts from './../Charts/Charts';

class Profile extends Component {
	constructor() {
		super();
		this.state = {
			open: false,
			tipOfDay: 'Keep your fingers relaxed.',
			wpmHist: {},
			accHist: {}
		};
	}

	componentDidMount() {
        // get username, userImg, tipOfDay, wpmHist, accHist
		if (!this.props.user.user_id) {
			axios
				.get('/api/user-data')
				.then((userOnSesh) => this.props.getUser(userOnSesh.data))
				.catch((error) => console.log('Oi! Somethings gone wrong!', error));
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({open: nextProps.show})
    }

	hideProfileModal = () => {
        this.props.close()
		this.setState({ open: false });
	};

	render() {
		return (
			<Modal open={this.state.open} onClose={this.hideProfileModal} className={{ modal: 'custom-modal' }} center>
				<div className="profile-userInfo">
					<img src={this.props.user.img} className="profile-userInfo-img" alt="user icon" />
					<h2>Welcome {this.props.user.username}</h2>
				</div>

				<div className="profile-graphs">
					<div><Charts /></div>
				</div>

				<div className="profile-tips">
					<h3>Tip Of The Day</h3>
					{this.state.tipOfDay}
				</div>
			</Modal>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		user: state.user,
		userTestResults: state.results
	};
};

export default connect(mapStateToProps, { getUser, getUserResults})(Profile);
