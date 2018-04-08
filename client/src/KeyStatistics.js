import React, {Component} from 'react';
import { Table } from 'reactstrap';

class KeyStatistics extends Component {
  constructor(props) {
    super();
    this.state = {
      keyStatistics: []
    };
  }
  componentDidMount() {
    fetch('/key-statistics').then(res => {
      console.log(res);
      return res.json()
    }).then(res => {
      console.log(res);
      this.setState({keyStatistics:res.keyStatistics})
    }).catch(err => {
      console.log(err);
    })
  }
  render() {
    return (
      <div className = "keyStatisitcs" >
        <h2>Key statistics</h2>
        <Table size="sm" hover responsive>
          <thead>
            <tr>
              <th>Year-Month</th>
              <th>Opened</th>
              <th>Closed</th>
              <th>Opened by <br/> user with 1 <br/> advertisement</th>
              <th>Closed by <br/> user with 1 <br/> advertisement</th>
            </tr>
          </thead>
          <tbody>
          {
            this.state.keyStatistics.map(
              statRow =>
                <tr>
                  <td>
                    {statRow.year}-{statRow.month}
                  </td>
                  <td>
                    {statRow.opened}
                  </td>
                  <td>
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
      < /div >
      );
    }
  }

  export default KeyStatistics;
