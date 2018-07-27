import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';

import LastUpdatedAdvertisements from '../LastUpdatedAdvertisements/LastUpdatedAdvertisements';
import KeyStatistics from '../KeyStatistics/KeyStatistics';
import AdvertisementsView from '../AdvertisementsView/AdvertisementsView';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      lastAdvertisements: []
    };
  }

  render() {
    return (
      < div className = "App" >
        <header className = "App-header" >
          <h1 className = "App-title" > Advertisement inspector </h1>
        </header>
        <Container>
          <Row>
            <Col lg="8">
              <AdvertisementsView />
            </Col>
            <Col lg="4">
              <Row>
                <Col>
                  <LastUpdatedAdvertisements />
                </Col>
              </Row>
              <Row>
                <Col>
                  <KeyStatistics />
                </Col>
              </Row>
            </Col>
          </Row>

        </Container>
      < /div >);
    }}

  export default App;
