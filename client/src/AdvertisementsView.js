import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, Col} from 'reactstrap';

export default class AdvertisementsView extends Component {
  render() {
    return (
      <div>
        <h2> Advertisements view </h2>
        <Form>
          <FormGroup row>
            <Label for="openedDateFrom" md={4}>Opened from:</Label>
            <Col md={4}>
              <Input type="date" name="date" id="openedDateFrom" placeholder="date placeholder" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="openedDateTo" md={4}>Opened to:</Label>
            <Col md={4}>
              <Input type="date" name="date" id="openedDateFrom" placeholder="date placeholder" />
            </Col>
          </FormGroup>

          <Button>Get advertisements</Button>

        </Form>
      </div>
    );
  }
}
