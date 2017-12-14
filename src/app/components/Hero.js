import React, {Component} from 'react';

export class Hero extends Component {
  render() {
    return (
      <div className="hero">
        <h1 className="text-center">
          <small>Estamos contigo</small>
          en el día más feliz de tu vida
        </h1>

        <button className="btn btn-default">Realizar Pedido</button>
      </div>
    );
  }
}
