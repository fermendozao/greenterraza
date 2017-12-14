import React, {Component} from 'react';
// react-bootstrap elements
import {Button, Form, FormGroup, FormControl, Col} from 'react-bootstrap';
import axios from 'axios';
import userStore from './../user';

const styles = {
  actionBtn: {
    marginBottom: '-15px',
    lineHeight: '2',
    fontSize: '22px'
  },
  closeBtn: {
    cursor: 'pointer',
    margin: '10px',
    float: 'right'
  }
};

export class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
      errors: []
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.onClose();
  }

  _handleSubmit(e) {
    e.preventDefault();
    const _this = this;

    if (this.state.password === '' || this.state.email === '') {
      return;
    }

    axios
      .post('/auth/login', {
        password: this.state.password,
        email: this.state.email
      })
      .then(response => {
        axios.defaults.headers.common['Authorization'] = `JWT ${response.data.token}`;
        return axios.get('/me');
      })
      .then(response => {
        userStore.me = response.data;
      })
      .catch(error => {
        if (typeof error.data !== 'undefined' && typeof error.data.nonFieldErrors !== 'undefined') {
          if (typeof error.data.nonFieldErrors.length !== 'undefined') {
            _this.setState({errors: error.data.nonFieldErrors});
          }
        }
      });
  }

  _onChange(name, e) {
    const newState = {};
    newState[name] = e.target.value;
    this.setState(newState);
  }

  render() {
    let errors = this.state.errors.map(error => {
      if (error === 'invalid credentials') {
        error = 'El nombre de usuario y/o contraseña son inválidos';
      } else if (error === 'the user has not been activated') {
          error = 'El usuario aún no ha sido activado'
      }
      return error;
    }).map((error, idx) => {
      return <li className="text-danger" key={idx}>{error}</li>;
    });

    return (
      <div>
        <Form horizontal className="loginform" onSubmit={this._handleSubmit}>
          <a onClick={this.handleClose} style={styles.closeBtn}>
            <i className="fa fa-2x fa-times-circle" ariaHidden="true"></i>
          </a>
          <div className="input-container">
            <FormGroup>
              <Col xs={12}>
                <FormControl type="email" value={this.state.email} onChange={this._onChange.bind(this, 'email')} placeholder="Escribe tu mail" ref="email" required/>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col xs={12}>
                <FormControl type="password" value={this.state.password} onChange={this._onChange.bind(this, 'password')} placeholder="Escribe tu contraseña" ref="password" required/>
              </Col>
            </FormGroup>
            <ul className="list-unstyled">
              {errors}
            </ul>
          </div>
          <FormGroup>
            <Col xs={12}>
              <Button type="submit" bsStyle="primary" style={styles.actionBtn} block>
                ENTRAR
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  onChange: React.PropTypes.func
};
