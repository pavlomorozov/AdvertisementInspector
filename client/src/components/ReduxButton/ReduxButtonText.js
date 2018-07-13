import React, { Component } from 'react';
import { connect } from "react-redux";
import { addText } from "../../actions/index";

const mapStateToProps = state => {
  return { buttonData: state.reduxReducer.buttonData };
};

const mapDispatchToProps = dispatch => {
  return {
    addText: data => dispatch(addText(data))
  };
};

class ConnectedReduxButtonText extends Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){
    this.props.addText("[Added data here]");
  }

  render (){
    const { buttonData } = this.props;
    return (<div onClick={this.handleClick}>
      HELLO, REDUX WILL BE HERE!

      { buttonData }

    </div> );
  }
};

const ReduxButtonText = connect(mapStateToProps, mapDispatchToProps)(ConnectedReduxButtonText);

export default ReduxButtonText;
