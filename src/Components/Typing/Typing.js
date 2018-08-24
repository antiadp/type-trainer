import React, { Component } from 'react';
import Metrics from '../Metrics/Metrics';
import { Line } from 'react-chartjs-2'
import axios from 'axios';

class Typing extends Component {
	constructor(props) {
		super();
		this.WPMArray = []
		this.ACCArray = []
		this.DEM = 0
		this.state = {
			language: 1,
			languageCount:5,
			id: 0,
			input: '',
			asciiArray: [],
			lettersArray: [' '],
			timerBool: false,
			snippetAscii: [],
			DEM: 0,
			WPMData: {
				labels: ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
				datasets: [
					{
						label: 'WPM',
						data:
							// this.props.WPMArray
							this.WPMArray
					}
				],
			},
			ACCData: {
				labels: ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
				datasets: [
					{
						label: 'Accuracy',
						data:
							// this.props.ACCArray
							this.ACCArray

					}],
				color: 'green',
				backgroundColor: 'blue',
				borderColor: 'red',
				BorderWidth: 5

			},

			spanArray: []
		};
	}
	componentDidUpdate(prevProps){
		if(prevProps !== this.props){
			this.onComponentMount()
			switch (this.props.language) {
				case 'HTML':
					this.setState({ language: 1 })
					break
				case 'CSS':
					this.setState({ language: 2 })
					break
				case 'JavaScript':
					this.setState({ language: 3 })
					break
				case 'Special Characters':
					this.setState({ language: 4 })
					break
				default:
					this.setState({ langugae: 1 })
			}
		}
	}
	
	componentDidMount() {
		this.onComponentMount()
	}
	onComponentMount(){
		axios.get(`/api/get-snippet/${+this.state.language}`).then((res) => {

			let currentSnippet = res.data[this.state.id].snippet;
			let snippetArray = currentSnippet.split(',').map((current) => {
				return Number(current);
			});

			this.setState({ snippetAscii: snippetArray })
			let lettersArray = [];

			for (let i = 0; i < snippetArray.length; i++) {
				lettersArray.push(String.fromCharCode(snippetArray[i]));
			}
			// letterArray is an array of character strings from the snippet script
			this.setState({
				lettersArray: lettersArray,
				languageCount:res.data.length
			});
			console.log('lettersArray',this.state.lettersArray)
		});
		
	}
	// updateUserInput is converting user input to ascii chars and pushing them into asciiArray
	updateUserInput = (value) => {
		if (!this.state.timerBool) {
			this.setState({
				input: value
			});

			let userInputArray = [];
			// let styleArray = [];

			for (let i = 0; i < value.length; i++) {
				userInputArray.push(value.charCodeAt(i));
			}

			//THERE ARE SO MANY PROBLEMS HERE I DON'T KNOW WHAT TO DO WITH THEM.
			//MUTATING STATE DIRECTLY... CHANGING THE ITEM AFTER THE CHECKED ITEM. ETC.
			//  asciiArray is an array of ascii nums that the user has input
			//     asciiArray: userInputArray

			// for(let i = 0; i < userInputArray.length; i++){


			// 		if(i > 0){
			// 			// this.setState({
			// 			// })
			// 			this.state.untypedSpanArray[i + 1] === '<span class=cursor></span>'
			// 		}


			// 	if(userInputArray[i] === this.state.snippetAscii[i]){
			// 		// console.log(i, 'is the same')
			// 		this.state.spanArray[i] = '<span class=correct></span>'
			// 	}else if(userInputArray[i] !== this.state.snippetAscii[i]){
			// 		// console.log(i, 'not the same')
			// 		this.state.spanArray[i] = '<span class=incorrect></span>'
			// 	}

			// 	console.log('spanArray', this.state.spanArray)
			// }

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
		// console.log('Read Only fired');
		this.setState({
			timerBool: true
		});
	};
	passChartMetrics = (wpm, acc, dem) => {
		console.log('chartMetrics Fired')

		let WPM10Percent = Math.floor(wpm.length / 10)
		let WPMTemp = [wpm[WPM10Percent], wpm[(WPM10Percent * 2)], wpm[(WPM10Percent * 3)], wpm[(WPM10Percent * 4)], wpm[(WPM10Percent * 5)], wpm[(WPM10Percent * 6)], wpm[(WPM10Percent * 7)], wpm[(WPM10Percent * 8)], wpm[(WPM10Percent * 9)], wpm[wpm.length - 1]]
		let WPMPassed = WPMTemp.map(e => { return Math.round(e) })

		let ACC10Percent = Math.floor(acc.length / 10)
		let ACCTemp = [acc[ACC10Percent], acc[(ACC10Percent * 2)], acc[(ACC10Percent * 3)], acc[(ACC10Percent * 4)], acc[(ACC10Percent * 5)], acc[(ACC10Percent * 6)], acc[(ACC10Percent * 7)], acc[(ACC10Percent * 8)], acc[(ACC10Percent * 9)], acc[acc.length - 1]]
		let ACCPassed = ACCTemp.map(e => { return Math.round(e * 100) })

		this.setState({

			WPMData: {
				labels: ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
				datasets: [
					{
						label: 'WPM',
						data:
							// this.props.WPMArray
							WPMPassed
					}
				]
			},
			ACCData: {
				labels: ['10%', '20%', '30%', '40%', '50%', '60%', '7%', '80%', '90%', '100%'],
				datasets: [
					{
						label: 'Accuracy',
						data:
							ACCPassed
					}],
				color: 'green',
				backgroundColor: 'blue',
				borderColor: 'red',
				BorderWidth: 5
			},
			DEM: dem
		})
	}

	// createUntypedArray = () => {
	// 	let classes = 'untyped';
	// 	let untypedSpanArray = this.state.lettersArray.map((letter, i) => {
	// 		return (
	// 			<span key={i+'key'} className={classes}>{letter}</span>
	// 		);
	// 	});

	// 	this.setState({
	// 		spanArray: untypedSpanArray
	// 	})
	// }
	changeSnippet = (el) =>{
		if (el === 'up'){
			if (el === this.state.languageCount-1){
				this.setState({
					id:0
				})
			} else {

				this.setState({
					id:this.state.id+1
				})
				}
		} 
		if (el === 'down'){
			if(this.state.id === 0){
				this.setState({id:this.state.languageCount.length-1})
			} else {
				this.setState({
					id:this.state.id-1
				})
			}
			
		}
	}

	render() {

		// joined is the snippet script string 
		// let joined = this.state.lettersArray.join('');

		// let spans = this.state.spanArray.map((current, index) => {
		// 	return (
		// 		current
		// 	)
		// })
		console.log('spanArray ', this.state.spanArray)
		return (
			<div className="typing-wrapper">
				<Metrics
					userInputAscii={this.state.asciiArray}
					snippetAscii={this.state.snippetAscii}
					toggleReadOnly={this.toggleReadOnly}
					passChartMetrics={this.passChartMetrics}
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
						<div id="snippetDisplay">{this.state.spanArray}</div>
					</div>
				</div>
				<br />
				<div className="buttonWrapper">
					<button id="previous" className = 'button' onClick = {()=>this.changeSnippet('up')}>Previous Snippet</button>
					<p id = "language">
					{this.props.language}
					</p>

					<button id="next" className = 'button' onClick = {()=>{this.changeSnippet('down')}}>Next Snippet</button>
				</div>
				{this.state.timerBool ?
					<div className="charts">
						{/* <Charts WPMArray = {this.WPMArray} ACCArray = {this.ACCArray} DEM = {this.DEM} /> */}
						<div className="chartsWrapper">
							<div className="chart chartWPM">
								<Line
									data={this.state.WPMData}
									width={100}
									height={30}
								/>
							</div>
							<div className="chart chartACC">
								<Line
									data={this.state.ACCData}
									width={100}
									height={30}
								/>
							</div>
						</div>
					</div>
					: <div></div>

				}

			</div>
		);
	}
}
export default Typing;
