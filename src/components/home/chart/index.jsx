import React, { Component } from 'react';
import DonutChart           from './donutChart';
import './style.scss';

class Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 30,
            options: [
                { value: 1, name: "24 HOURS" },
                { value: 7, name: "7 DAYS" },
                { value: 30, name: "1 MONTH" },
                { value: 9999, name: "ALL" }
            ]
        };
    }

    componentDidMount() {
        this.props.onDurationChange(this.state.value);
    }

    handleOnChange = (event) => {
        this.setState({value: event.target.value});
        this.props.onDurationChange(event.target.value);
    }

    render() {
        return (
            <div className='chart'>
                <h3 className='sentiment-score'>Sentiment Score</h3>
                <div className='time-row'>
                    <select onChange={this.handleOnChange} value={this.state.value} className='duration-dropdown'>
                        {this.state.options.map((item, key) => <option key={key} value={item.value}>{item.name}</option>)}
                    </select>
                </div>
                <DonutChart className='circle' data={this.props.data}/>
                <h3 className='number'>{this.props.number}</h3>
                <h5>total</h5>
            </div>
        );
    }
}

Chart.propTypes = {
    number: React.PropTypes.any.isRequired,
    data: React.PropTypes.array.isRequired,
    onDurationChange: React.PropTypes.func.isRequired
}

export default Chart;
