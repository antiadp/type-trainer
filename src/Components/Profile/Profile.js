import React, {Component} from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import {getUser} from './../../ducks/reducer';

class Profile extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            userImg: '',
            tipOfDay: '',
            wpmHist: {},
            accHist: {}
        }

        this.handleCloseModal = this.handleCloseModal.bind(this);

    }

    componentDidMount(){
        // get username, userImg, tipOfDay, wpmHist, accHist
        axios.get(`/api/user/${5}`).then(res => {
            console.log('data on front end', res.data)
            this.props.getUser(res.data)
        }).catch((error) => console.log('Oi! Somethings gone wrong!', error));
    }

    handleCloseModal(){
        // close profile modal
    }


    render(){
        return(
            <div className="profile">
                <button onClick={ this.handleCloseModal}
                        className="profile-close-btn">
                        X</button>
                <div className="profile-userInfo">
                    <h2>Welcome { this.state.username }</h2>
                    <img src={this.state.userImg} alt=""/>
                </div>

                <div className="profile-graphs">
                    <p>Some Graphs & Charts</p>
                </div>

                <div className="profile-tips">
                    <h3>Tip Of The Day</h3>
                    {this.state.tipOfDay}
                </div>

            </div>
        )
    }
}

export default connect(null, {getUser})(Profile);