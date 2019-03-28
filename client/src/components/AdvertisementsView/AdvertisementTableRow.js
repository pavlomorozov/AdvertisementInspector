import React, {Component} from 'react';
import { connect } from "react-redux";
import { showAdvertisement, chooseAdvertisement, getAdDetails } from "../../actions/index";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

const mapStateToProps = state => {
  return {
    showAdvertisement: state.advertisementsReducer.showAdvertisement,
    chosenAdvertisement: state.advertisementsReducer.chosenAdvertisement,
    advertisementDetails: state.advertisementsReducer.advertisementDetails
  };
}

const mapDispatchToProps = dispatch => {
  return {
    showAdvertisement: data => dispatch(showAdvertisement(data)),
    chooseAdvertisement: data => dispatch(chooseAdvertisement(data)),
    getAdDetails:  data => dispatch(getAdDetails(data))
  };
}

class ConnectedAdvertisementTableRow extends Component {
  constructor(props) {
    super(props);
    this.tableRowClick = this.tableRowClick.bind(this);
  }

  tableRowClick(e){
    const advertisement = this.props.advertisement;
    console.log('chosen ad id: ' + advertisement.ad_id);
    //show advertisement data component and hide table
    this.props.showAdvertisement(true);
    //update store with ChosenAdvertisement
    this.props.chooseAdvertisement(advertisement);

    //call back end for Advertisement details and update store
    this.props.getAdDetails(undefined);
    console.log("call for advertisement details");
    fetch(`/advertisement-details?id=${advertisement.ad_id}`).then(res => {
      console.log(res);
      return res.json()
    }).then(res => {
      console.log(res);
      this.props.getAdDetails(res.advertisementDetails);
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    var chosen = false;

    if (this.props.chosenAdvertisement) {
      chosen = this.props.chosenAdvertisement.ad_id === this.props.advertisement.ad_id ? true : false;
    }

    return (
      <tr key={this.props.advertisement.ad_id} onClick={this.tableRowClick} className={chosen ? 'border rounded':''} style={chosen ? {'backgroundColor':'#F5FCF5', 'border':'1px solid #7788AA !important'} : {}}>
        <td style={{'padding':'2px','borderColor':'#7788AA'}}>
          {this.props.advertisement.user_name}
        </td>
        <td style={{'padding':'2px','borderColor':'#7788AA'}}>
          {this.props.advertisement.ads_number}
        </td>
        <td style={{'padding':'2px','borderColor':'#7788AA'}}>
          {this.props.advertisement.last_is_open 
            ? <FontAwesomeIcon style={{'color':'#2D882D'}} icon={faCheckCircle} />
            : <FontAwesomeIcon style={{'color':'#A6A938'}} icon={faTimesCircle} />
          }
        </td>
        <td style={{'padding':'2px','borderColor':'#7788AA'}}>
          <a href={this.props.advertisement.ad_url}> > </a>
        </td>
        <td style={{'padding':'2px','borderColor':'#7788AA'}}>
          <span>
            {this.props.advertisement.caption}
          </span>
        </td>
        <td style={{'padding':'2px','borderColor':'#7788AA'}}>
          ${this.props.advertisement.last_price}
        </td>
        <td style={{'padding':'2px','borderColor':'#7788AA'}}>
          {this.props.advertisement.open_days}
        </td>
        <td style={{'padding':'2px','borderColor':'#7788AA'}}>
          {this.props.advertisement.location}
        </td>
      </tr>
    );
  }
}

const AdvertisementTableRow = connect(mapStateToProps, mapDispatchToProps)(ConnectedAdvertisementTableRow);

export default AdvertisementTableRow;
