import React, {Component} from 'react'
import {Line} from 'react-chartjs-2'

export default class Charts extends Component{
    constructor(){
        super()
        this.state = {
            chartData: {
                labels: ['1', '2', '3', '4', '5'],
                
                datasets: [
                    {
                        label: 'WPM',
                        data:[
                            65,
                            100,
                            43,
                            60,
                            70
                        ]
                    }
                ],
                backgroundColor: [
                    'dodgerblue',
                    'yellow',
                    'red'
                ]
            }
        }
    }
	render() {
		return (
			<div className="chart">
				<Line
					data={this.state.chartData}
					width={100}
					height={25}
					// options={{
					//     maintainAspectRatio: false
					// }}
				/>
			</div>
		);
	}
}
