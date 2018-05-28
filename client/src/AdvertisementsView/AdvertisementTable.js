import React, {Component} from 'react';

import {Table} from 'reactstrap';

class AdvertisementTable extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Table style={{'table-layout': 'fixed'}} hover>
        <tbody style={
            {'display' : 'block',
            'height' : '300px',
            'overflow-y' : 'scroll'}}>
        {
          this.props.data.map(
            advertisement =>
              <tr key={advertisement.ad_id}>
                <td style={{'width': '30%'}}>
                  <div>{advertisement.user_name+';'}</div>
                  <div style={{'font-size': 'small'}}>
                    <div>ads number: {advertisement.ads_number};</div>
                    <div>link pattern: {advertisement.link_pattern};</div>
                    <div>{advertisement.user_since};</div>
                    <div>id: {advertisement.user_id};</div>
                    <div>
                      <a style={{'word-break': 'break-all'}} href={advertisement.user_url}>{advertisement.user_url}</a>
                    </div>
                  </div>
                </td>
                <td className="col-md-10">

                  <div className="advertisement-title">
                    {advertisement.caption}
                  </div>
                  <div style={{'font-size': 'small'}}>
                    <div>
                      <span> id: {advertisement.ad_id}; </span>
                      <span> location: {advertisement.location}; </span>
                    </div>
                    <div>
                      <span> last price: {advertisement.last_price}; </span>
                      <span> init price: {advertisement.init_price}; </span>
                      <span> activity: {advertisement.price_activity}; </span>
                    </div>
                    <div>
                      <span> status: {advertisement.last_is_open ? "open" : "closed"}; </span>
                      <span> first open: {advertisement.first_update.replace(/T.*/i,"")}; </span>
                      <span> open days: {advertisement.open_days}; </span>
                    </div>
                    <div>
                      <a href={advertisement.ad_url}>{advertisement.ad_url}</a>
                    </div>
                  </div>
                </td>
              </tr>
          )
        }
        </tbody>
      </Table>
      );
    }
  }

  export default AdvertisementTable;
