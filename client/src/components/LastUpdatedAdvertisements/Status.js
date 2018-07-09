import React, {Component} from 'react';
import './Status.css';

class Status extends Component {
  constructor(props) {
    super(props);
    this.status = props.status;
  }
  render() {
    return (
      < div className = "Status" >
        {
          <div>
            <div>
              {this.status.is_open ? "Open" : "Closed"}
            </div>
            <div className="updated">
              {this.status.updated.replace(/T.*/i,"")}
            </div>
          </div>
        }
      < /div >
      );
    }
  }

  export default Status;
