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
      <div className = "keyStatisitcsChart">
        <h4> Advertisements number posted
        by user with 1 advertisement </h4>
        <div style={{'border':'1px solid #4E648E'}}>
          <ResponsiveContainer height={400}>
            <LineChart data={this.state.chartData}>
              <Line type="monotone" dataKey="opened" stroke="#2D882D" />
              <Line type="monotone" dataKey="closed" stroke="#A6A938" />
              <CartesianGrid stroke="#4E648E" strokeDasharray="10 10" />
              <XAxis dataKey="timeInterval" stroke="#4E648E"/>
              <YAxis stroke="#4E648E"/>
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      );
    }
  }

  export default KeyStatisticsChart;
