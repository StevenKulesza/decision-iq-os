/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import * as styles from '../../../styles/modal/modal';

import LoginForm from '../../login/loginForm'


class ModalGeneral extends React.Component {

  render() {
      return (
        <React.Fragment>
        <Modal isOpen={this.props.isOpen} onClosed={this.props.onClosed} className={(this.props.size === 'large' ? 'modal-lg ' :'') + this.props.className + ' ' + styles.modal}>
          <ModalHeader>{this.props.title}</ModalHeader>
          <ModalBody>
            <LoginForm onSuccess={this.props.onSuccess} onFailure={this.props.onFailure} />
          </ModalBody>
          <ModalFooter>
           
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

ModalGeneral.defaultProps = {
  onClick: () => {},
  onClosed: () => {},
  onSuccess: () => {},
  onFailure: () => {}
}

export default ModalGeneral;
