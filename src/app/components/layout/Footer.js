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
              <h4>GREEN TERRAZA</h4>
              <p>01-55-5600-9078</p>
              <p>Lunes a Domingo</p>
              <p>9:00 am a 9:00pm</p>
              <p>Green Terraza &copy; <a href="#">Aviso de privacidad</a></p>
            </Col>

            <Col xs={12} smOffset={4} sm={4}>
              <h4>Green Terraza</h4>
            </Col>
          </Row>
        </Grid>
      </footer>
    );
  }
}
