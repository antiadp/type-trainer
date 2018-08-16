import React, {Component} from 'react'
import {connect} from 'react-redux';

class SideNav extends Component{


    setLanguage = (e)=>{
        this.props.setLanguage(e)
    }
    tempChangeLogin = () =>{
        this.props.tempChangeLogin()
    }
    render(){
    const {testResults} = this.props;
    let leaderBoard = testResults.map(user =>{
        return (
            <div key={user.test_id}>
            <h4>{user.username}</h4>
            <h4>wpm:{user.wpm} cpm:{user.cpm} accuracy:{user.accuracy}</h4>
            <img style={{width: "50px", height: "50px", borderRadius: "15px", backgroundColor: "blue"}} src={user.img} alt="user"/>
            </div>
        )
    })
    return(
        <div className="nav-wrapper">
            <div className="login">
                {this.props.loggedIn?<h4>true</h4>:<button id='login-button' onClick={this.tempChangeLogin}>Login / Register</button>
                }
            </div>
            <div className="script-wrapper">
                <h4 onClick={()=>{this.setLanguage('HTML')}} className='script click'>HTML</h4>
                <h4 onClick={()=>{this.setLanguage('CSS')}} className='script click'>CSS</h4>
                <h4 onClick={()=>{this.setLanguage('JavaScript')}} className='script click'>JavaScript</h4>
                <h4 onClick={()=>{this.setLanguage('Special')}} className='script click'>Special</h4>
            </div>
            <div className="nav-leader-board">
                <h1>LEADERBOARD</h1>
                {leaderBoard}
            </div>
            <div className="logout">
                {this.props.loggedIn?<button onClick={this.tempChangeLogin}>Logout</button>:''}
            </div>
        </div>
    )
    }
}
const mapStateToProps = (state) => {
    return {
        testResults: state.results
    }
}

export default connect(mapStateToProps,{})(SideNav);