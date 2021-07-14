import React, { Component } from 'react'
import axios from 'axios'

import ModalGeneral from './modal'

export class PublishModal extends Component {
  constructor() {
    super();
    this.publish = this.publish.bind(this);
  }


  publish() {
    let data = {
      "businessName": this.props.client.name,
      "flightName": this.props.flight.name,
      "flightStartDate": new Date(this.props.flight.startDate).toISOString().split('-').join('').slice(0, 8), //YYYYMMDD
      "audienceObj": this.props.selectedTemplate.template
    }
    axios.post('/flights/publish', data, {
        headers: {
          // "Authorization": "Bearer " + token,
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(res => alert(res.data.message))
      .catch(error => {
        alert('Could not publish. Check your publish settings or server.')
        console.log("error ", error)
      }
      );
  }

  render() {
    return (
      <ModalGeneral 
        buttonLabel='PUBLISH'
        title={'Are you sure you want to publish '+this.props.flight.name+'?'}
        actionButton='Publish'
        onClick={this.publish}
      >
      <p>Flight: {this.props.flight.name}</p>
      <p>Business: {this.props.client.name}</p>
        <p>Start Date: {new Date(this.props.flight.startDate).toISOString().slice(0, 10)}</p>
      </ModalGeneral>
    )
  }
}
export default PublishModal;
