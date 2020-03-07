import React from "react";
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker, HoverState } from '@devexpress/dx-react-chart';

export default class PieGraph extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data : this.props.data,
            hover: undefined,
        };

        this.changeHover = hover => {
            this.setState({ hover });

        };
    }

    render() {
        return (
            <div>
                {this.props.data.length > 0 && (
                    <div className='bar-graph-container graph-container' id="transaction-per-day-container">

                        <Chart data={this.props.data} width="1200" height="300" className="bar-graph">
                            <ArgumentAxis />
                            <ValueAxis />
                            <BarSeries
                                name="Transaction Per Day"
                                valueField={this.props.valueField}
                                argumentField={this.props.argumentField}
                            />
                            <EventTracker />
                            <HoverState hover={this.state.hover} onHoverChange={this.changeHover}/>
                        </Chart>
                        <div className='data-label p-2'>
                            {this.props.title}
                        </div>
                    </div>
                )}
                {this.props.data.length == 0 && (
                    <div className="loading" id="transaction-graph-loading-message">
                        <h5>Loading data ...</h5>
                    </div>
                )}
            </div>
        )
    }
}
