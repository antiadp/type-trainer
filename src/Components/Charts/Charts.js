import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'

export default class Charts extends Component {
    constructor(props) {
        super(props)
        this.state={
            WPMData:{},
            ACCData:{}
        }
        this.WPMData = {
            labels: [1,2,3,4,5,6,7,8,9,10],
            datasets: [
                {
                    label: 'WPM',
                    data: 
                    // this.props.WPMArray
                    [1,2,3,4,5,6,7,8,9,10]
                }
            ]
        }
        this.ACCData = {
            labels: ['1%','2%','3%','4%','5%','6%','7%','8%','9%','10%'],
            datasets: [
                {
                    label: 'Accuracy',
                    data:
                        // this.props.ACCArray
                        [1,2,3,4,5,6,7,8,9,10]

                }]
        }
    }
    componentDidUpdate(prevProps) {
        console.log('props',this.props)
        if (prevProps !== this.props) {
            this.updateState()
            
        // debugger
    }
}
    updateState = () =>{
        console.log('state has been set')
        this.setState({
            WPMData : {
                labels: ['1%','2%','3%','4%','5%','6%','7%','8%','9%','10%'],
                datasets: [
                    {
                        label: 'WPM',
                        data: this.props.WPMArray
                    }
                ]
            },
              ACCData : {
                    labels: ['1%','2%','3%','4%','5%','6%','7%','8%','9%','10%'],
                    datasets: [
                        {
                            label: 'Accuracy',
                            data:
                                // [10,5,60,75,90,15,25,36,9,100]
                            this.props.ACCArray
                        }]
                }
        })
    }
    render() {
        console.log('props', this.props)
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
