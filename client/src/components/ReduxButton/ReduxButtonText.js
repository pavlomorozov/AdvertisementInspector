import React from 'react';
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { buttonData: state.reduxReducer.buttonData };
};

const ConnectedReduxButtonText = ({buttonData}) => (
  <div>
    HELLO, REDUX WILL BE HERE!
    {buttonData}
  </div>
);

const ReduxButtonText = connect(mapStateToProps)(ConnectedReduxButtonText);

export default ReduxButtonText;
