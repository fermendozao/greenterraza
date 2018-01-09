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
              <div className="home-section">
                <h2 className="title">Creamos momentos</h2>
                <p className="description">
                  Bienvenido a la experiencia Green terraza, diseño Floral para eventos sociales y corporativos.
                  Diseños florales tan especiales como lo son los <br/>momentos que tú creas.
                </p>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs={4}>
              <div className="gallery-element">
                <img className="image" src="../assets/img/flor1.jpg"/>
                <div className="description">
                  <h3>Sueño de invierno</h3>
                  <span>Ramo Pomander</span>
                </div>
              </div>
            </Col>

            <Col xs={4}>
              <div className="gallery-element">
                <img className="image" src="../assets/img/flor2.jpg"/>
                <div className="description">
                  <h3>Sueño de invierno</h3>
                  <span>Ramo Pomander</span>
                </div>
              </div>
            </Col>

            <Col xs={4}>
              <div className="gallery-element">
                <img className="image" src="../assets/img/flor3.jpg"/>
                <div className="description">
                  <h3>Sueño de invierno</h3>
                  <span>Ramo Pomander</span>
                </div>
              </div>
            </Col>

            <Col xs={4}>
              <div className="gallery-element">
                <img className="image" src="../assets/img/flor4.jpg"/>
                <div className="description">
                  <h3>Sueño de invierno</h3>
                  <span>Ramo Pomander</span>
                </div>
              </div>
            </Col>

            <Col xs={4}>
              <div className="gallery-element">
                <img className="image" src="../assets/img/flor5.jpg"/>
                <div className="description">
                  <h3>Sueño de invierno</h3>
                  <span>Ramo Pomander</span>
                </div>
              </div>
            </Col>

            <Col xs={4}>
              <div className="gallery-element">
                <img className="image" src="../assets/img/bouquet.jpg"/>
                <div className="description">
                  <h3>Sueño de invierno</h3>
                  <span>Ramo Pomander</span>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <div className="home-section">
                <h2 className="title">Eventos</h2>
                <p className="description">Cuenta con nuestro asesoramiento en la decoraión parcial o total del evento</p>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs={3}>
              <div className="events-item">
                <img src="../assets/img/icons/ic_zapatos.jpg"/>
                <h4 className="title">Quince Años</h4>
                <ul className="list">
                  <li>Arreglo de carro</li>
                  <li>Decoración Evento total o parcial</li>
                  <li>Centros de mesa</li>
                </ul>
              </div>
            </Col>

            <Col xs={3}>
              <div className="events-item">
                <img src="../assets/img/icons/ic_sonaja.jpg"/>
                <h4 className="title">Bautizos y Baby Shower</h4>
                <ul className="list">
                  <li>Centros de Mesa Temáticos.</li>
                  <li>Ambientación acorde al gusto del cliente</li>
                </ul>
              </div>
            </Col>

            <Col xs={3}>
              <div className="events-item"> 
                <img src="../assets/img/icons/ic_anillos.jpg"/>
                <h4 className="title">Bodas</h4>
                <ul className="list">
                  <li>Centros de Mesa</li>
                  <li>Ramo de novia</li>
                  <li>Ramo para la virgen</li>
                  <li>Ramo para aventar</li>
                </ul>
              </div>
            </Col>

            <Col xs={3}>
              <div className="events-item">
                <img src="../assets/img/icons/ic_copas.jpg"/>
                <h4 className="title">Eventos Corporativos</h4>
                <ul className="list">
                  <li>Decoración para un evento corporativo</li>
                  <li>Decoración para la recepción de una oficina</li>
                  <li>Decoración para Aniversarios</li>
                  <li>Decoración para Inauguración</li>
                  <li>Reuniones</li>
                </ul>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
