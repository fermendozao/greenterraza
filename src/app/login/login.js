import React, {Component} from 'react';
import {LoginForm} from '../login/loginForm.js';
// react-bootstrap elements
import {Overlay} from 'react-bootstrap';

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState({show: !this.state.show});
  }

  render() {
    return (
      <span>
        <a onClick={this.handleToggle}>Entrar</a>
        <Overlay
          show={this.state.show}
          onHide={this.handleToggle}
          rootClose
          trigger="click"
          placement="bottom"
          container={this}
          >
          <LoginForm onClose={this.handleToggle}/>
        </Overlay>
      </span>
    );
  }
}
