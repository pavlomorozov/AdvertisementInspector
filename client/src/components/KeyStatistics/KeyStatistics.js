import React, {Component} from 'react';
import { Table } from 'reactstrap';

import KeyStatisticsChart from './KeyStatisticsChart';

import './KeyStatistics.css';

class KeyStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyStatistics: [],
      chartData: [],
      isChartDataLoaded: false
    };
  }
  componentDidMount() {
    fetch('/key-statistics').then(res => {
      console.log(res);
      return res.json()
    }).then(res => {
      console.log(res);
      var updatedState = {};
      updatedState.keyStatistics = res.keyStatistics;
      var chartData = res.keyStatistics.map(
        statRow => {
          var entry = {};
          entry.timeInterval = statRow.timeInterval;
          entry.opened = statRow.openedByUserWith1advertisement;
          entry.closed = statRow.closedByUserWith1advertisement;
          return entry;
        }
      )

      updatedState.chartData = chartData;

      if (!Array.isArray(chartData) || !chartData.length) {
        updatedState.isChartDataLoaded = false;
      }else{
        updatedState.isChartDataLoaded = true;
      }

      this.setState(updatedState);

    }).catch(err => {
      console.log(err);
    })
  }
  render() {


    const isChartDataLoaded = this.state.isChartDataLoaded;

    const chart = isChartDataLoaded ? (
      <KeyStatisticsChart chartData = {this.state.chartData} />
    ) : "";

    return (
      <div className = "keyStatisitcs" style={{'color':'#4E648E'}}>
        <h2>Key statistics</h2>
        <Table size="sm" responsive>
          <thead>
            <tr>
              <th rowSpan="2">Year-Month</th>
              <th rowSpan="2" style={{'color':'#2D882D'}}>Opened</th>
              <th rowSpan="2" style={{'color':'#A6A938'}}>Closed</th>
              <th colSpan="2">By user with 1 ad.</th>
            </tr>
            <tr>
              <th>Opened</th>
              <th>Closed</th>
            </tr>
          </thead>
          <tbody>
          {
            this.state.keyStatistics.map(
              statRow =>
                <tr key={statRow.timeInterval}>
                  <td>
                    {statRow.timeInterval}
                  </td>
                  <td style={{'color':'#2D882D'}}>
                    {statRow.opened}
                  </td>
                  <td style={{'color':'#A6A938'}}>
                    {statRow.closed}
                  </td>
                  <td>
                    {statRow.openedByUserWith1advertisement}
                  </td>
                  <td>
                    {statRow.closedByUserWith1advertisement}
                  </td>
                </tr>
            )
          }
          </tbody>
        </Table>


        {chart}


      < /div >
      );
    }
  }

  export default KeyStatistics;
