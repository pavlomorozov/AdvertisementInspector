import React, {Component} from 'react';

import {Table} from 'reactstrap';

class ChosenAdvertisement extends Component {
  constructor(props) {
    super(props);
    console.log('ChosenAdvertisement constructor call');
  }

  render() {
    return (
      <div className='border rounded'>
        {/*
          Both borderless attribute and
          className='table-borderless'
          not works on Table class. Why?
          */}
        <Table>
          <tbody>
            <tr>
                <td style={{'width': '30%', 'border':'none'}}>
                  <div>{this.props.chosenAdvertisement.user_name+';'}</div>
                  <div style={{'fontSize': 'small'}}>
                    <div>ads number: {this.props.chosenAdvertisement.ads_number};</div>
                    <div>link pattern: {this.props.chosenAdvertisement.link_pattern};</div>
                    <div>{this.props.chosenAdvertisement.user_since};</div>
                    <div>id: {this.props.chosenAdvertisement.user_id};</div>
                    <div>
                      <a style={{'wordBreak': 'break-all'}} href={this.props.chosenAdvertisement.user_url}>{this.props.chosenAdvertisement.user_url}</a>
                    </div>
                  </div>
                </td>
                <td  style={{'border':'none'}}>
                  <div>
                    {this.props.chosenAdvertisement.caption}
                  </div>
                  <div style={{'fontSize': 'small'}}>
                    <div>
                      <span> id: {this.props.chosenAdvertisement.ad_id}; </span>
                      <span> location: {this.props.chosenAdvertisement.location}; </span>
                    </div>
                    <div>
                      <span> last price: {this.props.chosenAdvertisement.last_price}; </span>
                      <span> init price: {this.props.chosenAdvertisement.init_price}; </span>
                      <span> activity: {this.props.chosenAdvertisement.price_activity}; </span>
                    </div>
                    <div>
                      <span> status: {this.props.chosenAdvertisement.last_is_open ? "open" : "closed"}; </span>
                      <span> first open: {this.props.chosenAdvertisement.first_update.replace(/T.*/i,"")}; </span>
                      <span> open days: {this.props.chosenAdvertisement.open_days}; </span>
                    </div>
                    <div>
                      <a href={this.props.chosenAdvertisement.ad_url}>{this.props.chosenAdvertisement.ad_url}</a>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
          {this.props.advertisementDetails !== undefined ?
            this.props.advertisementDetails :
            <div> No details found yet </div>}
        </div>
      );
    }
  }

  export default ChosenAdvertisement;
