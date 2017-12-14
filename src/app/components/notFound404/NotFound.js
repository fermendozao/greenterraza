import React, {Component} from 'react';

const styles = {
  notice: {
    padding: '20vh 0',
    color: '#adadad',
    textAlign: 'center'
  },
  h1: {
    fontSize: '100px'
  }
};

export class NotFound extends Component {
  render() {
    return (
      <div style={styles.notice}>
        <h1 style={styles.h1}>404</h1>
        <h2>No encontramos la página que estás buscando :(</h2>
      </div>
    );
  }
}
