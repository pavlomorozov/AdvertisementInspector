import React, {Component} from 'react';
import './Advertisement.css';

class Advertisement extends Component {
  constructor(props) {
    super(props);
    this.advertisement = props.advertisement;
  }
  render() {
    return (
      < div className = "Advertisement" >
        {
          <div>
            <div className="advertisement-title">
              {this.advertisement.caption}
            </div>
            <div className="advertisement-id">
              id: {this.advertisement.id}
            </div>
            <div className="advertisement-location">
              location: {this.advertisement.location}
            </div>
          </div>
        }
      < /div >
      );
    }
  }

  export default Advertisement;
