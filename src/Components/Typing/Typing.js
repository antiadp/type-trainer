import React, { Component } from 'react';
import Metrics from '../Metrics/Metrics';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import reducer from '../../ducks/reducer';

class Typing extends Component {
	constructor(props) {
		super();
		this.WPMArray = [];
		this.ACCArray = [];
		this.state = {
			language: 1,
			languageCount: 4,
			id: 0,
			input: '',
			asciiArray: [],
			lettersArray: [' '], // we don't have to have this. it is only useful for debugging
			finishBool: false,
			snippetAscii: [],
			WPMData: {
				labels: ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
				datasets: [
					{
						label: 'WPM',
						data: this.WPMArray
					}
				]
			},
			ACCData: {
				labels: ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
				datasets: [
					{
						label: 'Accuracy',
						data: this.ACCArray
					}
				],
				color: 'green',
				backgroundColor: 'blue',
				borderColor: 'red',
				BorderWidth: 5
			}
		};
		this.textRef = React.createRef();

	}
	selectText = () => {
		this.textRef.current.focus();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.language !== this.props.language) {
			switch (this.props.language) {
				case 'HTML':
					this.setState({ language: 1 });
					break;
				case 'CSS':
					this.setState({ language: 2 });
					break;
				case 'JavaScript':
					this.setState({ language: 3 });
					break;
				case 'Special':
					this.setState({ language: 4 });
					break;
				default:
					this.setState({ language: 1 });
			}
			this.clearMe()
		
		}
		if (prevState.id !== this.state.id) {

			this.clearMe()
		}
		if(prevState.language !== this.state.language){
			console.log('language',this.state.language)

			this.clearMe()
		}
	}
	componentDidMount() {
		this.onComponentMount();
	}
	onComponentMount() {
		axios.get(`/api/get-snippet/${+this.state.language}`).then((res) => {
			let currentSnippet = res.data[this.state.id].snippet;
			let snippetArray = currentSnippet.split(',').map((current) => {
				return Number(current);
			});
			this.setState({ snippetAscii: snippetArray });
			let lettersArray = [];
			lettersArray = snippetArray.map((char, i) => {
				return String.fromCharCode(char);
			});
			this.setState({
				lettersArray: lettersArray,
				languageCount: res.data.length
			});
			// console.log('currentSnippet', this.state.snippetAscii)
			this.selectText()
		});
		// this.refs.createRef()
		// WHEN THIS RUNS WE NEED TO SELECT THE TEXT BOX UNDER THE PROTECTING DIV. AND ON CLICK FOR THE PROTECTING DIV

	}
	updateUserInput = (value) => {
		if (!this.state.finishBool) {
			this.setState({
				input: value
			});
			let userInputArray = [];
			for (let i = 0; i < value.length; i++) {
				if (value.charCodeAt(i) === 9) {
					userInputArray.push(<span>&nbsp;</span>)
				}
				userInputArray.push(value.charCodeAt(i));
			}
			this.setState({ asciiArray: userInputArray });
		}
	};

	clearMe = () => {
		this.setState({
			input: '',
			asciiArray: [],
			// lettersArray: [],
			finishBool: false,
			snippetAscii: [],
			WPMData: {
				labels: ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
				datasets: [
					{
						label: 'WPM',
						data: this.WPMArray
					}
				]
			},
			ACCData: {
				labels: ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
				datasets: [
					{
						label: 'Accuracy',
						data: this.ACCArray
					}
				],
				color: 'green',
				backgroundColor: 'blue',
				borderColor: 'red',
				BorderWidth: 5
			}
		});
		this.onComponentMount()
	};

	preventPaste = (e) => {
		e.preventDefault()
	}

	toggleReadOnly = () => {
		this.setState({
			finishBool: true
		});
	};
	passChartMetrics = (wpm, acc, dem) => {

		let WPM10Percent = Math.floor(wpm.length / 10);
		let WPMTemp = [
			wpm[WPM10Percent],
			wpm[WPM10Percent * 2],
			wpm[WPM10Percent * 3],
			wpm[WPM10Percent * 4],
			wpm[WPM10Percent * 5],
			wpm[WPM10Percent * 6],
			wpm[WPM10Percent * 7],
			wpm[WPM10Percent * 8],
			wpm[WPM10Percent * 9],
			wpm[wpm.length - 1]
		];
		let WPMPassed = WPMTemp.map((e) => {
			return Math.round(e);
		});

		let ACC10Percent = Math.floor(acc.length / 10);
		let ACCTemp = [
			acc[ACC10Percent],
			acc[ACC10Percent * 2],
			acc[ACC10Percent * 3],
			acc[ACC10Percent * 4],
			acc[ACC10Percent * 5],
			acc[ACC10Percent * 6],
			acc[ACC10Percent * 7],
			acc[ACC10Percent * 8],
			acc[ACC10Percent * 9],
			acc[acc.length - 1]
		];
		let ACCPassed = ACCTemp.map((e) => {
			return Math.round(e * 100);
		});

		this.setState({
			WPMData: {
				labels: ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
				datasets: [
					{
						label: 'WPM',
						data: WPMPassed
					}
				]
			},
			ACCData: {
				labels: ['10%', '20%', '30%', '40%', '50%', '60%', '7%', '80%', '90%', '100%'],
				datasets: [
					{
						label: 'Accuracy',
						data: ACCPassed
					}
				],
				color: 'rgba(200, 0, 0, 0.1)',
				backgroundColor: 'blue',
				borderColor: 'red',
				BorderWidth: 5
			},
		});
	};
	changeSnippet = (el) => {
		if (el === 'up') {
			if (this.state.id === this.state.languageCount - 1) {
				this.setState({
					id: 0,
				});
			} else {
				this.setState({
					id: +this.state.id + 1,
				});
			}
		}
		if (el === 'down') {
			if (this.state.id === 0) {
				this.setState({ id: this.state.languageCount - 1 });
			} else {
				this.setState({
					id: +this.state.id - 1
				});
			}
		}
		this.clearMe()
		this.onComponentMount()
	};

	render() {
		// console.log(this.state.finishBool)
		let spanDisplay = this.state.snippetAscii.map((char, i) => {
			let { asciiArray } = this.state;
			let textClass = '';
			let letter = String.fromCharCode(char);

			if (i === asciiArray.length) {
				textClass = 'current';
			} else if (!asciiArray[i]) {
				textClass = 'untyped';
			} else if (char === asciiArray[i]) {
				textClass = 'correct';
			} else {
				textClass = 'incorrect';
				letter = String.fromCharCode(asciiArray[i]);
			}
			if (char === 9) {
				textClass += ' tab'
				return <span key={i + 'tab'} className={textClass}>&nbsp;&nbsp;&nbsp;&nbsp;</span>
			}
			if (char === 10) {
				textClass += ' enterKey';
				return <br key={i + 'enter'} className={textClass} />;
			}
			if (char === 10 && asciiArray.length[i - 1]) {
				// console.log('HHHHHEEEEEEEYYYYYYY', i)
			}
			if (char === 32) {
				textClass += ' spaceKey';
			}
			return (
				<div key={i} className={textClass}>
					{letter}
				</div>
			);
		});

		return (
			<div className="typing-wrapper">
				<Metrics
					userInputAscii={this.state.asciiArray}
					snippetAscii={this.state.snippetAscii}
					toggleReadOnly={this.toggleReadOnly}
					passChartMetrics={this.passChartMetrics}
				/>
				<div className="display-wrapper">
					<div className="DisplayText" onClick={this.selectText}>
						<div id="snippetDisplay">{spanDisplay}</div>
					</div>
				</div>
				<textarea
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
					maxLength="500"
					readOnly={this.state.finishBool}
					onCopy={this.preventPaste}
					onDrag={this.preventPaste}
					onDrop={this.preventPaste}
					onPaste={this.preventPaste}
					value={this.state.input}
					maxinput='500'
					// unselectable='true'
					ref={this.textRef}
				/>

				<br />
					<p className="language-selection" id="language">You are currently practicing {this.props.language}</p>
				<div className="wrapper-wrapper">
					<div className="buttonWrapper">
						<button id="previous" 
										className="button" 
										onClick={() => this.changeSnippet('up')}>
										Previous Snippet</button>


						<button	id="next"
										className="button"
										onClick={() => {this.changeSnippet('down')}}>
										Next Snippet</button>
					</div>
				</div>	

				{this.state.finishBool ? (
					<div className="charts">
						<div className="chartsWrapper">
							<div className="chart chartWPM">
								<Line data={this.state.WPMData} width={100} height={30} />
							</div>
							<div className="chart chartACC">
								<Line data={this.state.ACCData} width={100} height={30} />
							</div>
						</div>
					</div>
				) : (
						<div />
					)}
			</div>
		);
	}
}
export default Typing;
