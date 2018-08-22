import React, {Component} from 'react';

import {Table} from 'reactstrap';

import AdvertisementTableRow from './AdvertisementTableRow';

class AdvertisementTable extends Component {

  render() {
    return (
      <Table style={{'tableLayout': 'fixed'}} hover>
        <tbody style={
            {'display' : 'block',
            'height' : '300px',
            'overflowY' : 'scroll',
            'overflowX' : 'hidden'}}>
        {
          this.props.data.map(
            advertisement =>
              <AdvertisementTableRow key={advertisement.ad_id} advertisement={advertisement}/>
          )
        }
        </tbody>
      </Table>
      );
    }
  }

  export default AdvertisementTable;
