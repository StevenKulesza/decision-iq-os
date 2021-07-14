/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import * as styles from '../../../styles/modal/modal';

class ModalGeneral extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
      const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;

      return (
      <React.Fragment>
        <Button style={{display:'inline-block'}} color={this.props.buttonColor} onClick={this.toggle}>{this.props.buttonLabel}</Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={(this.props.size === 'large' ? 'modal-lg ' :'') + this.props.className + ' ' + styles.modal}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>{this.props.title}</ModalHeader>
          <ModalBody>
            {this.props.children}
          </ModalBody>
          <ModalFooter>
           
          <Button block 
            color={this.props.actionButtonColor ? this.props.buttonColor : "secondary"} 
            onClick={()=> {this.props.onClick(); this.toggle();}}>
            {this.props.actionButton}
          </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

ModalGeneral.defaultProps = {
  onClick: () => {}
}

export default connect()(ModalGeneral);
