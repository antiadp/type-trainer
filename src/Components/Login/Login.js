import React, {Component} from 'react';
import './Login.css';

class Login extends Component{
    constructor(){
        super()
        this.state = {
            username:'',
            password:'',
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this);    
        this.handlePasswordChange = this.handlePasswordChange.bind(this);    
        this.handleLoginRegRequest = this.handleLoginRegRequest.bind(this);    
    }

    handleUsernameChange(val) {
        this.setState({username: val})
    }

    handlePasswordChange(val) {
        this.setState({password: val})
    }

    handleLoginRegRequest(){

    }


    render(){
        return(
            <div className="loginReg-container">
                <div className="loginReg-username">
                    <p>Username</p>
                    <input onChange={(e) => this.handleUsernameChange( e.target.value )} 
                           className="loginReg_username-input" 
                           type="text"/>
                </div>

                <div className="loginReg-password">
                    <p>Password</p>
                    <input onChange={(e) => this.handlePasswordChange( e.target.value )} 
                           className="loginReg-password-input" 
                           type="text"/>
                </div>

                <div>
                    <button onClick={ this.handleLoginRegRequest}
                            className="loginReg-btn">
                            Login / Register</button>
                </div>
            
            </div>
        )
    }
}