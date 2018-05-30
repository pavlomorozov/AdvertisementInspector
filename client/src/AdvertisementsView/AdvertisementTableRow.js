import React, {Component} from 'react';

class AdvertisementTableRow extends Component {
  constructor(props) {
    super(props);
    this.tableRowClick = this.tableRowClick.bind(this);
  }

  tableRowClick(e){

    console.log("table row click event: " + e);
    this.props.chooseAdvertisement(this.props.advertisement);

  }

  render() {
    return (
              <tr key={this.props.advertisement.ad_id} onClick={this.tableRowClick}>
                <td style={{'width': '30%'}}>
                  <div>
                    <span>{this.props.advertisement.user_name+';'}</span>
                    <span> ads: {this.props.advertisement.ads_number}; </span>
                  </div>
                  <div style={{'fontSize': 'small'}}>
                    <div>
                      <a style={{'wordBreak': 'break-all'}} href={this.props.advertisement.user_url}>{this.props.advertisement.user_url}</a>
                    </div>
                  </div>
                </td>
                <td className="col-md-10">

                  <div>
                    {this.props.advertisement.caption}
                    <a href={this.props.advertisement.ad_url}> > </a>
                  </div>
                  <div style={{'fontSize': 'small'}}>
                    <div>
                      <span> $: {this.props.advertisement.last_price}; </span>
                      <span> {this.props.advertisement.location}; </span>
                      <span> {this.props.advertisement.last_is_open ? "open" : "closed"}; </span>
                      <span> shown: {this.props.advertisement.open_days} days; </span>
                    </div>
                    <div>

                    </div>
                  </div>
                </td>
              </tr>
      );
    }
  }

  export default AdvertisementTableRow;
