import React, {Component} from 'react';
import {Grid, Row, Col, Carousel} from 'react-bootstrap';

class Events extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <Grid style={{marginTop: '100px'}}>
        <h1>Eventos</h1>
        <Row>
          <Col xs={8}>
            <Carousel>
              <Carousel.Item>
                <img width={900} height={500} alt="900x500" src="./assets/img/flor1.jpg"/>
              </Carousel.Item>
              <Carousel.Item>
                <img width={900} height={500} alt="900x500" src="./assets/img/flor2.jpg"/>
              </Carousel.Item>
              <Carousel.Item>
                <img width={900} height={500} alt="900x500" src="./assets/img/flor3.jpg"/>
              </Carousel.Item>
              <Carousel.Item>
                <img width={900} height={500} alt="900x500" src="./assets/img/flor4.jpg"/>
              </Carousel.Item>
            </Carousel>
          </Col>

          <Col xs={4}>
            Es de que este sería el sidebar
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Events;
