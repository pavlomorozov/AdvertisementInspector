import React, {Component} from 'react';
import { connect } from "react-redux";
import {Button} from 'reactstrap';
import ReduxButtonText from './ReduxButtonText';

const ReduxButton = ({buttonData}) => (
  <Button>
    <ReduxButtonText/>
  </Button>
);

export default ReduxButton;
