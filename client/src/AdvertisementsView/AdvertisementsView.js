import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import AdvertisementTable from './AdvertisementTable';
import ChosenAdvertisement from './ChosenAdvertisement';

import './AdvertisementsView.css';

export default class AdvertisementsView extends Component {

  constructor(props) {
    super(props);

    const todayString = (new Date()).toISOString().replace(/T.*/i,"");

    this.state = {
      dateFrom: todayString,
      dateTo: todayString,
      advertisementsTableData: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.chooseAdvertisement = this.chooseAdvertisement.bind(this);
  }

  /*
  Initiates show chosen advertisemen and
  highlight advertisement in table row
  */
  chooseAdvertisement(advertisement){
    console.log('chosen ad id: ' + advertisement.ad_id);
    this.setState({chosenAdvertisement: advertisement});
  }

  componentDidMount() {
    this.handleSubmit();
  }

  handleChange(e){
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]:value});
  }

  handleSubmit(e) {
    if (e !== undefined){
      e.preventDefault();
    }

    console.log("submit dates: " + this.state.dateFrom + " " + this.state.dateTo);

    var queryParameters = {
      "from":this.openedDateFrom,
      "to":this.openedDateTo
    }

    console.log(queryParameters);

    fetch(`/advertisements-view-table?dateFrom=${this.state.dateFrom}&dateTo=${this.state.dateTo}`).then(res => {
      console.log(res);
      return res.json()
    }).then(res => {
      console.log(res);
      this.setState({advertisementsTableData: res.advertisementsTableData});
      console.log("AdvertisementsView.state");
      console.log(this.state);
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
        <h2> Advertisements view </h2>
        <Form>
          <div className="div-flex">
            <FormGroup className="group-inline mb-2  mr-sm-2">
              <Label className="label-inline mr-sm-2" for="dateFrom">from:</Label>
              <Input className="input-inline" type="date" name="dateFrom" id="dateFrom" placeholder="date placeholder" onChange={this.handleChange} value={this.state.dateFrom}/>
            </FormGroup>

            <FormGroup className="group-inline mb-2 mr-sm-2">
              <Label className="label-inline mr-sm-2" for="dateTo">to:</Label>
              <Input className="input-inline" type="date" name="dateTo" id="dateTo" placeholder="date placeholder" onChange={this.handleChange} value={this.state.dateTo}/>
            </FormGroup>
          </div>
          <Button className="mb-2" onClick={this.handleSubmit}>Get</Button>
        </Form>
        {this.state.advertisementsTableData.length !== 0 ?
          <AdvertisementTable data = {this.state.advertisementsTableData} chooseAdvertisement={this.chooseAdvertisement}/> :
          <div> No data to show found </div>}
        {this.state.chosenAdvertisement !== undefined ?
          <ChosenAdvertisement chosenAdvertisement = {this.state.chosenAdvertisement}/> :
          <div> No advertisement chosen </div>}
      </div>
    );
  }
}
