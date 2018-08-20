import React from 'react'

function DisplayText(props) {
    return (

        <div className="display-wrapper">
            <div className="display">
                <p id = 'childrenprops'>
                    {props.children}
                </p>

            </div>


        </div>
    )
}
export default DisplayText