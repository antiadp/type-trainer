import React from 'react';
// import '../App.css'
function Metrics (props) {
return(
    <div className="wrapper2">
        <div className="wrapper1">
          <div className="wpm">
            <h1>0</h1>
            <h4>WPM</h4>
          </div>
          <div className="cpm">
            <h1>0</h1>
            <h4>Char. per minute</h4>
          </div>
          <div className="acc">
            <h1>0%</h1>
            <h4>Accuracy</h4>
          </div>
        </div>
        <div className="timer">
          <h1>60</h1>
          <h4>Seconds</h4>
        </div>
    </div>
)
}
export default Metrics