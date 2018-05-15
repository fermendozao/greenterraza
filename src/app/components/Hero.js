import React, {Component} from 'react';

export class Hero extends Component {
  render() {
    return (
      <div className="hero-container">
        <h1 className="text-center title">
          <small>Estamos contigo</small>
          en el día más feliz de tu vida
        </h1>

        <p className="text-center">
          <button className="btn btn-default">Realizar Pedido</button>
        </p>
      </div>
    );
  }
}
