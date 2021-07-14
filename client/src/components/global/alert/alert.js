import React from 'react';
import { Alert } from 'reactstrap';

class AlertMessage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.props.onClick()
  }

  render() {
    return (
      <Alert 
        color={this.props.color} 
        isOpen={this.state.visible}
        name={this.props.name} 
        onClick={this.props.onClick}
        >
        {this.props.message}
        {this.props.dismissable ? 
          <button type="button" className="close" onClick={this.props.onClick} data-dismiss="alert" aria-label="Close" name={this.props.name} >
          <span aria-hidden="true" name={this.props.name} >&times;</span>
        </button>
        : null}
         
      </Alert>
    );
  }
}

export default AlertMessage;