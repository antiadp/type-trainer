import React from 'react'

function SideNav (props){


    var setLanguage = (e)=>{
        props.setLanguage(e)
    }
    var tempChangeLogin = () =>{
        props.tempChangeLogin()
    }
    return(
        <div className="nav-wrapper">
            <div className="login">
                {props.loggedIn?<h4>true</h4>:<button id='login-button' onClick={tempChangeLogin}>Login / Regester</button>
                }
            </div>
            <div className="script-wrapper">
                <h4 onClick={()=>{setLanguage('HTML')}} className='script'>HTML</h4>
                <h4 onClick={()=>{setLanguage('CSS')}} className='script'>CSS</h4>
                <h4 onClick={()=>{setLanguage('JavaScript')}} className='script'>JavaScript</h4>
                <h4 onClick={()=>{setLanguage('Special')}} className='script'>Special</h4>
            </div>
            <div className="logout">
                {props.loggedIn?<button onClick={tempChangeLogin}>Logout</button>:''}
            </div>
        </div>
    )
}

export default SideNav