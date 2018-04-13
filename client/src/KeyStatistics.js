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
      <div className = "keyStatisitcs" >
        <h2>Key statistics</h2>
        <Table size="sm" hover responsive>
          <thead>
            <tr>
              <th className="col-md-2" rowspan="2">Year-Month</th>
              <th className="col-md-2" rowspan="2">Opened</th>
              <th className="col-md-2" rowspan="2">Closed</th>
              <th className="col-md-6" colspan="2">By user with 1 ad.</th>
            </tr>
            <tr>
              <th className="col-md-3">Opened</th>
              <th className="col-md-3">Closed</th>
            </tr>
          </thead>

          <tbody>
          {
            this.state.keyStatistics.map(
              statRow =>
                <tr key={statRow.timeInterval}>
                  <td className="col-md-2">
                    {statRow.timeInterval}
                  </td>
                  <td className="col-md-2">
                    {statRow.opened}
                  </td>
                  <td className="col-md-2">
                    {statRow.closed}
                  </td>
                  <td className="col-md-3">
                    {statRow.openedByUserWith1advertisement}
                  </td>
                  <td className="col-md-3">
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
