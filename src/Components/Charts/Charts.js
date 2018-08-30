import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'

export default class Charts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            WPMData: {},
            ACCData: {}
        }
        this.WPMData = {
            labels:['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
            datasets: [{
                    label: 'WPM',
                    data:[],
                }]
        }
        this.ACCData = {
            labels:['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
            datasets: [{
                    label: 'Accuracy',
                    data:[]
                }]
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.updateState()

        }
    }
    updateState = () => {
        this.setState({
            WPMData: {
                labels: ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
                datasets: [{
                        label: 'WPM',
                        data: this.props.WPMArray
                    }],
                title:'Title Here'
            },
            ACCData: {
                labels:['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
                datasets: [{
                        label: 'Accuracy',
                        data:
                            this.props.ACCArray
                    }],
              
            }
        })
    }
    render() {
        return (
            <div className="chartsWrapper">
                <div className="chart chartWPM">
                    <Line
                        data={this.WPMData}
                        width={100}
                        height={10}
                    />
                </div>
                <div className="chart chartACC">
                    <Line
                        data={this.ACCData}
                        width={100}
                        height={10}
                    />
                </div>
            </div>

        );
    }
}
