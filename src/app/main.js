import React, {Component} from 'react';
import {Hero} from './components/Hero';
import {Grid, Row, Col} from 'react-bootstrap';

import {GMap} from './components/Map/Map';
import {CarouselGallery} from './components/CarouselGallery/CarouselGallery';

export class Main extends Component {
  render() {
    return (
      <div>
        <Grid fluid>
          <Row>
            <Hero/>
          </Row>
        </Grid>

        <Grid fluid>
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
            <CarouselGallery/>
          </Row>

          <Row>
            <Col>
              <div className="home-section -image">
                <h1>Trato personal</h1>
                <p>Trabajamos contigo para crearte un estilo propio adaptado a
                  tus gustos, necesidades y por supuesto acorde a tu presupuesto
                  respetando tu propio estilo y gusto, tambien contamos con
                  asesoramiento para llegar a lo que haz soñado para ese día tan
                  especial.
                </p>
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
            <Col xs={12} md={3}>
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

            <Col xs={12} md={3}>
              <div className="events-item">
                <img src="../assets/img/icons/ic_sonaja.jpg"/>
                <h4 className="title">Bautizos y Baby Shower</h4>
                <ul className="list">
                  <li>Centros de Mesa Temáticos.</li>
                  <li>Ambientación acorde al gusto del cliente</li>
                </ul>
              </div>
            </Col>

            <Col xs={12} md={3}>
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
            <Col xs={12} md={3}>
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
          <Row>
            <Col>
              <div className="map">
                <GMap
                  lat={59.955413}
                  lng={30.337844}
                  />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
