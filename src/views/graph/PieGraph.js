import React from "react";
import {
  Chart,
  PieSeries,
  Legend} from '@devexpress/dx-react-chart-material-ui';

export default class BarGraph extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data : []
        }
    }

    render() {
        return (
            <div className='pie-graph-container graph-container'>
                <Chart data={this.props.data} width="400" height="auto" className="pie-chart">
                    <PieSeries
                        valueField={this.props.valueField}
                        argumentField={this.props.argumentField}
                    />
                    <Legend />
                </Chart>
                <div className='data-label p-2'>
                    {this.props.title}
                </div>
            </div>
        );
    }
}
