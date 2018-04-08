import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';

import LastUpdatedAdvertisements from './LastUpdatedAdvertisements';
import KeyStatistics from './KeyStatistics';

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
          <h1 className = "App-title" > Advertisement inspector < /h1>
        < /header >
        <Container>
          <Row>
            <Col>
              <LastUpdatedAdvertisements />
            </Col>
            <Col>
              <KeyStatistics />
            </Col>
          </Row>
        </Container>
      < /div >);
    }}

  export default App;
