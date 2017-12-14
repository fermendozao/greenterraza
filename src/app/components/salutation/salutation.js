import React, {Component} from 'react';
import {autorun} from 'mobx';
import userStore from '../../user.js';

const styles = {
  user: {
    color: 'white',
    background: '#33B3D0',
    borderRadius: '50%',
    display: 'inline-block',
    width: '30px',
    height: '30px',
    lineHeight: '27px',
    textAlign: 'center',
    fontSize: '22px'
  },
  text: {
    fontSize: '13px',
    display: 'inline-block',
    padding: '0 10px'
  }
};

export class Salutation extends Component {

  constructor() {
    super();
    this.state = {
      name: ''
    };
  }

  componentDidMount() {
    const _this = this;
    autorun(() => {
      _this.setState({
        name: userStore.me.name
      });
    });
  }

  render() {
    return (
      <a href="#/perfil">
        <span style={styles.user}>
          <span className="fa fa-user"></span>
        </span>
        <span style={styles.text}>
          ¡Hola, <strong>{this.state.name}</strong>!
        </span>
      </a>
    );
  }
}
