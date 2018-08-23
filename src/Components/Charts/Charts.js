import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'

export default class Charts extends Component {
    constructor(props) {
        super(props)
        this.WPMData = {
            labels: [1,2,3,4,5,6,7,8,9,10],
            datasets: [
                {
                    label: 'WPM',
                    data: this.props.WPMArray
                }
            ]
        }
        this.ACCData = {
            labels: [1,2,3,4,5,6,7,8,9,10],
            datasets: [
                {
                    label: 'Accuracy',
                    data:
                        // this.props.ACCArray
                        [1,2,3,4,5]

                }]
        }
        // this.data = { wpm: this.props.WPMArray, acc: this.props.ACCArray, dem: this.props.DEM }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props || prevState !== this.state) {
            
            this.WPMData = {
                labels: [1,2,3,4,5,6,7,8,9,10],

                datasets: [
                    {
                        label: 'WPM',
                        data: this.props.WPMArray
                    }
                ]
            },
                this.ACCData = {
                    labels: [1,2,3,4,5,6,7,8,9,10],
                    datasets: [
                        {
                            label: 'Accuracy',
                            data:
                                [10,5,60,75,90,15,25,36,9,100]

                        }]

                }
        }
        // debugger
    }

    render() {
        console.log('hard')
        // console.log('Charts Props:', this.props)
        // debugger
        return (
            <div className="chartsWrapper">
                <div className="chart chartWPM">
                    <Line
                        data={this.WPMData}
                        width={100}
                        height={30}
                    />
                </div>
                <div className="chart chartACC">
                    <Line
                        data={this.ACCData}
                        width={100}
                        height={30}
                    />
                </div>
            </div>

        );
    }
}
