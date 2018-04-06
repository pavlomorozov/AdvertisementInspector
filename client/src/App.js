import React, {Component} from 'react';

import LastUpdatedAdvertisements from './LastUpdatedAdvertisements';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      lastAdvertisements: []
    };
  }
  componentDidMount() {
    fetch('/last-advertisements').then(res => {
      console.log(res);
      return res.json()
    }).then(res => {
      console.log(res);
      this.setState({lastAdvertisements:res.lastAdvertisements})
    }).catch(err => {
      console.log(err);
    })
  }
  render() {
    return (
      < div className = "App" >
        <header className = "App-header" >
          <h1 className = "App-title" > Advertisement inspector < /h1>
        < /header >
        <LastUpdatedAdvertisements />
      < /div >);
    }}

  export default App;
