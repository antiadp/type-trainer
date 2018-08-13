import React from 'react'

function SideNav (){
return(
    <div className="side-nav">
        <div className="login" style = {{border:'1px solid rebeccapurple'}}>
            <h2>Login</h2>
        </div>
        <div className="wrapper">
            <h3>HTML</h3>
        </div>
        <div className="wrapper">
            <h3>CSS</h3>
        </div>
        <div className="wrapper">
            <h3>JavaScript</h3>
        </div>
        <div className="wrapper">
            <h3>Special Characters</h3>
        </div>
        <div className="wrapper">
            <h3>Custom Text</h3>
        </div>
    </div>
)
}

export default SideNav