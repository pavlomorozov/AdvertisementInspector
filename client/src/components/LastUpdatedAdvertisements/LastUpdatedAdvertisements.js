import React, {Component} from 'react';
import { Table } from 'reactstrap';

import Advertisement from './Advertisement';
import Status from './Status';

class LastUpdatedAdvertisements extends Component {
  constructor(props) {
    super();
    this.state = {
      lastAdvertisements: []
    };
  }
  componentDidMount() {
    fetch('/last-advertisements').then(res => {
      console.log(res);
      return res.json()
    }).then(res => {
      console.log(res);
      this.setState({lastAdvertisements:res.lastAdvertisements})
    }).catch(err => {
      console.log(err);
    })
  }
  render() {
    return (
      < div className = "LastUpdatedAdvertisements" >
        <h2>Last updated advertisements</h2>
        <Table hover>
          <tbody>
          {
            this.state.lastAdvertisements.map(
              advertisement =>
                <tr key={advertisement.id+"-"+advertisement.is_open}>
                  <td>
                    <Status status = {advertisement} />
                  </td>
                  <td>
                    <Advertisement advertisement = {advertisement} />
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

  export default LastUpdatedAdvertisements;
