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
    var chosen = false;
    if (this.props.chosenAdvertisement) {
      chosen = this.props.chosenAdvertisement.ad_id === this.props.advertisement.ad_id ? true : false;
    }

    return (
              <tr key={this.props.advertisement.ad_id} onClick={this.tableRowClick} className={chosen ? 'border rounded':''} style={chosen ? {'background-color':'#eee'} : {}}>
                <td style={{'width': '30%'}}>
                  <div>
                    <span>{this.props.advertisement.user_name+';'}</span>
                    <span> ads: {this.props.advertisement.ads_number}; </span>
                  </div>
                </td>
                <td className="col-md-10">
                  <span>
                    {this.props.advertisement.caption}
                    <a href={this.props.advertisement.ad_url}> > </a>
                  </span>
                  <span style={{'fontSize': 'small'}}>
                      <span> $: {this.props.advertisement.last_price}; </span>
                      <span> {this.props.advertisement.location}; </span>
                      <span> {this.props.advertisement.last_is_open ? "open" : "closed"}; </span>
                      <span> shown: {this.props.advertisement.open_days} days; </span>
                  </span>
                </td>
              </tr>
      );
    }
  }

  export default AdvertisementTableRow;
