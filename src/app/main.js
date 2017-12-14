import React, {Component} from 'react';
import {Hero} from './components/Hero';
import {Grid, Row, Col} from 'react-bootstrap';

export class Main extends Component {
  render() {
    return (
      <div>
        <Grid fluid>
          <Row>
            <div className="hero-container">
              <h1 className="text-center title">
                <small>Estamos contigo</small>
                en el día más feliz de tu vida
              </h1>

              <p className="text-center">
                <button className="btn btn-default">Realizar Pedido</button>
              </p>
            </div>
          </Row>
        </Grid>

        <Grid>
          <Row>
            <Col xs={12}>
              <h2>Creamos momentos</h2>
              <p>
                Bienvenido a la experiencia Green terraza, diseño Floral para eventos sociales y corporativos.
                Diseños florales tan especiales como lo son los momentos que tú creas.
              </p>
            </Col>
          </Row>

          <Row>
            <Col xs={4}>
              <div className="gallery-element">
                <img className="image img-responsive" src="../assets/img/flor1.jpg"/>
                <div className="description">
                  <h3>Sueño de invierno</h3>
                  <span>Ramo Pomander</span>
                </div>
              </div>
            </Col>

            <Col xs={4}>
              <div className="gallery-element">
                <img className="image img-responsive" src="../assets/img/flor2.jpg"/>
                <div className="description">
                  <h3>Sueño de invierno</h3>
                  <span>Ramo Pomander</span>
                </div>
              </div>
            </Col>

            <Col xs={4}>
              <div className="gallery-element">
                <img className="image img-responsive" src="../assets/img/flor3.jpg"/>
                <div className="description">
                  <h3>Sueño de invierno</h3>
                  <span>Ramo Pomander</span>
                </div>
              </div>
            </Col>

            <Col xs={4}>
              <div className="gallery-element">
                <img className="image img-responsive" src="../assets/img/flor4.jpg"/>
                <div className="description">
                  <h3>Sueño de invierno</h3>
                  <span>Ramo Pomander</span>
                </div>
              </div>
            </Col>

            <Col xs={4}>
              <div className="gallery-element">
                <img className="image img-responsive" src="../assets/img/flor5.jpg"/>
                <div className="description">
                  <h3>Sueño de invierno</h3>
                  <span>Ramo Pomander</span>
                </div>
              </div>
            </Col>

            <Col xs={4}>
              <div className="gallery-element">
                <img className="image img-responsive" src="../assets/img/bouquet.jpg"/>
                <div className="description">
                  <h3>Sueño de invierno</h3>
                  <span>Ramo Pomander</span>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <h2>Eventos</h2>
              <p>Cuenta con nuestro asesoramiento en la decoraión parcial o total del evento</p>
            </Col>
          </Row>

          <Row>
            <Col xs={3}>
              <img src="http://via.placeholder.com/150x150"/>
              <h4>Quince Años</h4>
              <p>
                Arreglo de carro
                Decoración Evento total o parcial
                Centros de Mesa
              </p>
            </Col>

            <Col xs={3}>
              <img src="http://via.placeholder.com/150x150"/>
              <h4>Bautizos y Baby Shower</h4>
              <p>
                Centros de Mesa Temáticos.
                Ambientación acorde al gusto del cliente
              </p>
            </Col>

            <Col xs={3}>
              <img src="http://via.placeholder.com/150x150"/>
              <h4>Bodas</h4>
              <p>
                Centros de Mesa
                Ramo de novia
                Ramo para la virgen
                Ramo para aventar
              </p>
            </Col>

            <Col xs={3}>
              <img src="http://via.placeholder.com/150x150"/>
              <h4>Eventos Corporativos</h4>
              <p>
                Decoración para un evento corporativo
                Decoración para un evento corporativo
                Decoración para un evento corporativo
                Decoración para un evento corporativo
              </p>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
