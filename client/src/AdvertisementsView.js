import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class AdvertisementsView extends Component {
  render() {
    return (
      <div>
        <h2> Advertisements view </h2>
        <Form inline>
          <FormGroup>
            <Label for="openedDateFrom">Opened date from:</Label>
            <Input type="date" name="date" id="openedDateFrom" placeholder="date placeholder" />
          </FormGroup>
           <Button>Get advertisements</Button>
        </Form>
      </div>
    );
  }
}
