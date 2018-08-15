import React, {Component} from 'react'

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