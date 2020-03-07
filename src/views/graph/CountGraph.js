import React from "react";

export default class CountGraph extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='count-graph-container graph-container'>
                <div className='data-count p-2'>
                    {this.props.count}
                </div>
                <div className='data-label p-2'>
                    {this.props.title}
                </div>
            </div>
        );
    }
}
