import React, {Component} from 'react';
import { LineChart, Line, CartesianGrid,
    XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

class KeyStatisticsChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData
    };
  }

  render() {
    return (
      <div className = "keyStatisitcsChart" >

      <ResponsiveContainer height={400}>

        <LineChart data={this.state.chartData}>
          <Line type="monotone" dataKey="opened" stroke="#66eeee" />
          <Line type="monotone" dataKey="closed" stroke="#ee66ee" />
          <CartesianGrid stroke="#ccc" strokeDasharray="10 10" />
          <XAxis dataKey="timeInterval" />
          <YAxis/>
          <Tooltip />
        </LineChart>

      </ResponsiveContainer>

      < /div >
      );
    }
  }

  export default KeyStatisticsChart;
