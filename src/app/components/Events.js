import React, {Component} from 'react';
import {Grid, Row, Col, Button, ButtonToolbar, ButtonGroup} from 'react-bootstrap';
import {Card} from './Card/Card';

const categories = [
  'Arreglos de ocasión',
  'Bautizos',
  'Bodas',
  'Eventos corporativos',
  'Principal',
  'XV años'
];

class Events extends Component {

  render() {
    return (
      <Grid style={{marginTop: '100px'}} className="events">
        <Row>
          <Col><h1>Eventos</h1></Col>
        </Row>

        <Row>
          <Col xs={12} mdHidden lgHidden>
            <ButtonToolbar>
              <ButtonGroup>
                {
                  categories.map((categoria, index) => {
                    return (
                      <Button key={index} className="btn btn-default">{categoria}</Button>
                    );
                  })
                }
              </ButtonGroup>
            </ButtonToolbar>
          </Col>
          <Col smHidden xsHidden md={3} >
            <ButtonGroup vertical>
              {
                categories.map((categoria, index) => {
                  return (
                    <Button key={index} className="btn btn-default">{categoria}</Button>
                  );
                })
              }
            </ButtonGroup>
          </Col>
          <Col xs={12} md={9}>
            <Row>
              <Col xs={6} md={4}>
                <Card
                  image={'../assets/img/flor1.jpg'}
                  modal
                  />
              </Col>

              <Col xs={6} md={4}>
                <Card
                  image={'../assets/img/flor2.jpg'}
                  modal
                  />
              </Col>

              <Col xs={6} md={4}>
                <Card
                  image={'../assets/img/flor3.jpg'}
                  modal
                  />
              </Col>

              <Col xs={6} md={4}>
                <Card
                  image={'../assets/img/flor4.jpg'}
                  modal
                  />
              </Col>

              <Col xs={6} md={4}>
                <Card
                  image={'../assets/img/flor5.jpg'}
                  modal
                  />
              </Col>

              <Col xs={6} md={4}>
                <Card
                  image={'../assets/img/bouquet.jpg'}
                  modal
                  />
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Events;
