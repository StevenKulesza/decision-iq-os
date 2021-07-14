import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap';
import axios from 'axios'

import * as modalStyles from '../../../styles/modal/modal';
import InputGeneral from '../form-groups/input';

import {addFlightName} from '../../../actions/flight';

export class SaveModal extends Component {
  constructor() {
    super();
    this.state = {
        saved: false,
        overwritePrompt: false,
        renamePrompt: false,
        newName: ""
    }

    this.saveFlight = this.saveFlight.bind(this);
    this.toggleSaved = this.toggleSaved.bind(this);
    this.toggleOverwritePrompt = this.toggleOverwritePrompt.bind(this);
    this.toggleRenamePrompt = this.toggleRenamePrompt.bind(this);
    this.updateFlight = this.updateFlight.bind(this);
    this.changeFlightName = this.changeFlightName.bind(this);
    this.handlerOverwritePromptYes = this.handlerOverwritePromptYes.bind(this);
  }

  toggleSaved(){
      this.setState({
        saved: !this.state.saved
      });
  }

  toggleOverwritePrompt(){
    this.setState({
        overwritePrompt: !this.state.overwritePrompt
    });
  }

  toggleRenamePrompt(){
    this.setState({
        renamePrompt: !this.state.renamePrompt
    });
  }

  handlerOverwritePromptYes(){
    this.updateFlight();
  }

  changeFlightName(){
    this.props.addFlightName(this.state.newName);
  }

  //Save the current flight
  saveFlight(flightName){
    
    var saveData = {
      name: (flightName) ? flightName : this.props.flight.name,
      data: this.props.template
    }

    axios({
      method:'post',
      url:'/flights/save',
      data: saveData
    })
    .then(() => {
      this.setState({
        saved: true
      });
    })
    .catch(err => {
      if(err.response.status === 304){
        this.setState({
          overwritePrompt: true
        });
      }else{
        alert(err)
      }
    });
  }

  //Update the existing flight (with the same name)
  updateFlight(){
    var saveData = {
      name: this.props.flight.name,
      data: this.props.template
    }

    axios({
      method:'patch',
      url:'/flights/save',
      data: saveData
    })
    .then(() => {
      this.setState({
        saved: true
      });
    })
    .catch(err => {alert(err)});
  }

  render() {
    const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;

    return (
      <React.Fragment>

        {/* Save Button */}
        <Button style={{display:'inline-block'}} onClick={() => {this.saveFlight()}}>SAVE</Button>

        {/* Saved Notification */}
        <Modal isOpen={this.state.saved} toggle={this.toggleSaved} className={modalStyles.modal}>
          <ModalHeader toggle={this.toggleSaved} close={closeBtn}>Saved</ModalHeader>
          <ModalBody>
          </ModalBody>
          <ModalFooter>
            <Button block color="secondary" onClick={()=> {this.toggleSaved();}} >OK</Button>
          </ModalFooter>
        </Modal>

        {/* Overwrite Prompt */}
        <Modal isOpen={this.state.overwritePrompt} toggle={this.toggleOverwritePrompt} className={modalStyles.modal}>
          <ModalHeader toggle={this.toggleOverwritePrompt} close={closeBtn}>Overwrite Flight?</ModalHeader>
          <ModalBody>
            A flight with the name "{this.props.flight.name}" already exists. Do you want to overwrite it?
          </ModalBody>
          <ModalFooter>
            <Container>
              <Row>
                <Col xs="4"><Button block color="secondary" onClick={()=> {this.handlerOverwritePromptYes(); this.toggleOverwritePrompt();}} >Overwrite</Button></Col>
                <Col xs="4"><Button block color="secondary" onClick={()=> {this.toggleOverwritePrompt(); this.toggleRenamePrompt();}} >Rename</Button></Col>
                <Col xs="4"><Button block color="secondary" onClick={()=> {this.toggleOverwritePrompt();}} >No</Button></Col>
              </Row>
            </Container>
          </ModalFooter>
        </Modal>

        {/* Rename Prompt */}
        <Modal isOpen={this.state.renamePrompt} toggle={this.toggleRenamePrompt} className={modalStyles.modal}>
          <ModalHeader toggle={this.toggleSaved} close={closeBtn}>Rename this Flight</ModalHeader>
          <ModalBody>
            <InputGeneral placeholder="Flight Name" type="text" value={this.state.newName} onChange={(e)=>{this.setState({newName:e.target.value});}}></InputGeneral>
          </ModalBody>
          <ModalFooter>
            <Button block color="secondary" onClick={()=> {this.changeFlightName();this.toggleRenamePrompt();this.saveFlight(this.state.newName);}} >Save</Button>
          </ModalFooter>
        </Modal>
        
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  flight: state.flight,
  template: state.templates.selectedTemplate
})
const mapDispatchToProps = dispatch => ({
  addFlightName: (flightName) => dispatch(addFlightName(flightName))
})
export default connect(mapStateToProps, mapDispatchToProps)(SaveModal)
