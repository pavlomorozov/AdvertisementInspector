import React, {Component} from 'react';
import { connect } from "react-redux";
import { chooseAdvertisement, getAdDetails } from "../../actions/index";

const mapStateToProps = state => {
  return { chosenAdvertisement: state.advertisementsReducer.chosenAdvertisement,
    advertisementDetails: state.advertisementsReducer.advertisementDetails};
}

const mapDispatchToProps = dispatch => {
  return {
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
      <tr key={this.props.advertisement.ad_id} onClick={this.tableRowClick} className={chosen ? 'border rounded':''} style={chosen ? {'backgroundColor':'#eee'} : {}}>
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

const AdvertisementTableRow = connect(mapStateToProps, mapDispatchToProps)(ConnectedAdvertisementTableRow);

export default AdvertisementTableRow;
