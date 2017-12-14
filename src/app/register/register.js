import React, {Component} from 'react';
// react-bootstrap elements
import {Modal} from 'react-bootstrap';
import {RegisterForm} from './registerForm';

const styles = {
  loginBtn: {
    marginTop: '5px'
  },
  title: {
    letterSpacing: '5px'
  }
};

export class Register extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleClose() {
    this.setState({showModal: false});
  }

  handleOpen() {
    this.setState({showModal: true});
  }

  render() {
    return (
      <span>
        <a onClick={this.handleOpen}>Registrarse</a>

        <Modal show={this.state.showModal} bsSize="medium" onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={styles.title}>Bienvenido</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RegisterForm/>
          </Modal.Body>
        </Modal>
      </span>
    );
  }
}
