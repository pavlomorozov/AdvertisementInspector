import React, {Component} from 'react';

import Advertisement from './Advertisement';
import Status from './Status';

import './Advertisement.css';

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
        <table>
        {
          this.state.lastAdvertisements.map(
            advertisement =>
              <tr id = {advertisement.id}>
                <td>
                  <Status status = {advertisement} />
                </td>
                <td>
                  <Advertisement advertisement = {advertisement} />
                </td>
              </tr>
          )
        }
        </table>
      < /div >
      );
    }
  }

  export default LastUpdatedAdvertisements;
