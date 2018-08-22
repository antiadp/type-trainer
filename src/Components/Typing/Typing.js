import React, { Component } from 'react';
import Metrics from '../Metrics/Metrics';
import Charts from '../Charts/Charts';
import axios from 'axios';

class Typing extends Component {
	constructor(props) {
		super();
		this.state = {
			input: '',
			asciiArray: [ 65 ],
			lettersArray: [ 'A' ],
            timerBool: false,
            snippetAscii: []
		};
	}

	componentDidMount() {
		axios.get('/api/get-snippet').then((res) => {
			let snippet = res.data[0].snippet;
			let snippetArray = snippet.split(',').map((current) => {
				return Number(current);
			});

            this.setState({snippetAscii: snippetArray})
			let lettersArray = [];

			for (let i = 0; i < snippetArray.length; i++) {
				// if (snippetArray[i] === 10) {
				// 	lettersArray.push(<br />);
				// }
				lettersArray.push(String.fromCharCode(snippetArray[i]));
			}
            // letterArray is an array of character strings from the snippet script
			this.setState({
				lettersArray: lettersArray
            });
		});
	}
	// updateUserInput is converting user input to ascii chars and pushing them into asciiArray
	updateUserInput = (value) => {
		if (!this.state.timerBool) {
			this.setState({
				input: value
			});
			let tempArray = [];
			for (let i = 0; i < value.length; i++) {
				tempArray.push(value.charCodeAt(i));
			}
            //  asciiArray is an array of ascii nums
			this.setState({
                asciiArray: tempArray
			});
		}
	};

	clearMe = () => {
		console.log('No pasting allowed');
		this.setState({
			input: '',
			asciiArray: ''
		});
	};
	toggleReadOnly = () => {
		console.log('fired');
		this.setState({
			timerBool: true
		});
	};

	render() {
		let classes;
		let snippetWithSpan = this.state.lettersArray.map((letter, i) => {
			return (
				<span key={i} className={classes}>{letter}</span>
			);
    });
        // joined is the snippet script string 
        // let joined = this.state.lettersArray.join('');
        
		return (
			<div className="typing-wrapper">
				<Metrics
					userInputAscii = {this.state.asciiArray}
					snippet = {this.state.snippetAscii}
					toggleReadOnly = {this.toggleReadOnly}
				/>

				<textarea
					value={this.state.input}
					onChange={(e) => {
						this.updateUserInput(e.target.value);
					}}
					data-gramm_editor="false"
					autoComplete="off"
					spellCheck="false"
					name="Main Typing input"
					id="text-input"
					cols="30"
					rows="10"
					placeholder={this.state.placeholder}
					maxLength="500"
					readOnly={this.state.timerBool}
					onCopy={this.clearInput}
					onDrag={this.clearInput}
					onDrop={this.clearInput}
					onPaste={this.clearInput}
				/>

				<div className="display-wrapper">
					<div className="DisplayText">
						<div id="snippetDisplay">{snippetWithSpan}</div>
					</div>
				</div>
				<br />
				<br />

				<div className="charts">
					<Charts />
				</div>
			</div>
		);
	}
}
export default Typing;
