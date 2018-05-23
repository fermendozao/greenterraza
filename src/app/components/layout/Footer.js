import React, {Component} from 'react';
// react-bootstrap elements
import {Row, Col, Grid} from 'react-bootstrap';

export class Footer extends Component {
  render() {
    return (
      <footer>
        <Grid>
          <Row>
            <Col xs={12} sm={4}>
              <h4 className="title">GREEN TERRAZA</h4>
              <ul className="fa-ul">
                <li><i className="fa-li fa fa-phone"/>01-55-5600-9078</li>
                <li><i className="fa-li fa fa-clock-o"/>Lunes a Domingo <br/>
                    9:00 am a 9:00pm
                </li>
              </ul>
              <p>Green Terraza &copy; <a href="#">Aviso de privacidad</a></p>
            </Col>

            <Col xs={12} smOffset={2} sm={6}>
              <h4 className="title">Green Terraza</h4>
              <form action="">
                <Row>
                  <Col xs={12} md={6}>
                    <input type="text" name="name" placeholder="Escribe tu nombre"/>
                  </Col>
                  <Col xs={12} md={6}>
                    <input type="text" name="mail" placeholder="Escribe tu mail"/>
                  </Col>
                  <Col xs={12}>
                    <input type="text" name="commentarios" placeholder="Tus comentarios"/>
                  </Col>
                </Row>
              </form>
            </Col>
          </Row>
        </Grid>
      </footer>
    );
  }
}
