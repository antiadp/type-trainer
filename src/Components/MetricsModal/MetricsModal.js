import React from 'react'

function MetricsModal(props) {
    var startNewTest = () =>{
        props.startNewTest()
    }
    return (
        <div className="metrics-modal-wrapper">
            <div className="metrics-wrapper2">
                <div className="WPM-wrapper">
                    <h4>{props.WPM}</h4>
                    <p>Words per minute</p>
                </div>
                <div className="CPM-wrapper">
                    <h4>{props.CPM}</h4>
                    <p>Characters per minute</p>
                </div>
                <div className="ACC-wrapper">
                    <h4>{props.ACC}</h4>
                    <p>Accuracy</p>
                </div>
                <button onClick={startNewTest} className = "next-button">Close and start again</button>
            </div>
        </div>
    )
}
export default MetricsModal