import React, {Component} from 'react';
import {Row, Col, Carousel} from 'react-bootstrap';
import {Card} from '../Card/Card';

export class CarouselGallery extends Component {
  render() {
    return (
      <div className="carousel_gallery container-fluid">
        <Row>
          <Carousel
            controls={false}
            pauseOnHover
            >
            <Carousel.Item>
              <Row>
                <Col xs={6} md={4}>
                  <Card
                    title={'Sueño de invierno'}
                    description={'Ramo de Pomander'}
                    image={'../../assets/img/flor1.jpg'}
                    />
                </Col>

                <Col xs={6} md={4}>
                  <Card
                    title={'Sueño de invierno'}
                    description={'Ramo de Pomander'}
                    image={'../../assets/img/flor2.jpg'}
                    />
                </Col>

                <Col xs={6} md={4}>
                  <Card
                    title={'Sueño de invierno'}
                    description={'Ramo de Pomander'}
                    image={'../../assets/img/flor3.jpg'}
                    />
                </Col>

                <Col xs={6} md={4}>
                  <Card
                    title={'Sueño de invierno'}
                    description={'Ramo de Pomander'}
                    image={'../../assets/img/flor4.jpg'}
                    />
                </Col>

                <Col xs={6} md={4}>
                  <Card
                    title={'Sueño de invierno'}
                    description={'Ramo de Pomander'}
                    image={'../../assets/img/flor5.jpg'}
                    />
                </Col>

                <Col xs={6} md={4}>
                  <Card
                    title={'Sueño de invierno'}
                    description={'Ramo de Pomander'}
                    image={'../../assets/img/bouquet.jpg'}
                    />
                </Col>
              </Row>
            </Carousel.Item>
            <Carousel.Item>
              <Row>
                <Col xs={6} md={4}>
                  <Card
                    title={'Sueño de invierno'}
                    description={'Ramo de Pomander'}
                    image={'../../assets/img/flor1.jpg'}
                    />
                </Col>

                <Col xs={6} md={4}>
                  <Card
                    title={'Sueño de invierno'}
                    description={'Ramo de Pomander'}
                    image={'../../assets/img/flor2.jpg'}
                    />
                </Col>

                <Col xs={6} md={4}>
                  <Card
                    title={'Sueño de invierno'}
                    description={'Ramo de Pomander'}
                    image={'../../assets/img/flor3.jpg'}
                    />
                </Col>

                <Col xs={6} md={4}>
                  <Card
                    title={'Sueño de invierno'}
                    description={'Ramo de Pomander'}
                    image={'../../assets/img/flor4.jpg'}
                    />
                </Col>

                <Col xs={6} md={4}>
                  <Card
                    title={'Sueño de invierno'}
                    description={'Ramo de Pomander'}
                    image={'../../assets/img/flor5.jpg'}
                    />
                </Col>

                <Col xs={6} md={4}>
                  <Card
                    title={'Sueño de invierno'}
                    description={'Ramo de Pomander'}
                    image={'../../assets/img/bouquet.jpg'}
                    />
                </Col>
              </Row>
            </Carousel.Item>
            <Carousel.Item>
              <Row>
                <Col xs={6} md={4}>
                  <Card
                    title={'Sueño de invierno'}
                    description={'Ramo de Pomander'}
                    image={'../../assets/img/flor1.jpg'}
                    />
                </Col>

                <Col xs={6} md={4}>
                  <Card
                    title={'Sueño de invierno'}
                    description={'Ramo de Pomander'}
                    image={'../../assets/img/flor2.jpg'}
                    />
                </Col>

                <Col xs={6} md={4}>
                  <Card
                    title={'Sueño de invierno'}
                    description={'Ramo de Pomander'}
                    image={'../../assets/img/flor3.jpg'}
                    />
                </Col>

                <Col xs={6} md={4}>
                  <Card
                    title={'Sueño de invierno'}
                    description={'Ramo de Pomander'}
                    image={'../../assets/img/flor4.jpg'}
                    />
                </Col>

                <Col xs={6} md={4}>
                  <Card
                    title={'Sueño de invierno'}
                    description={'Ramo de Pomander'}
                    image={'../../assets/img/flor5.jpg'}
                    />
                </Col>

                <Col xs={6} md={4}>
                  <Card
                    title={'Sueño de invierno'}
                    description={'Ramo de Pomander'}
                    image={'../../assets/img/bouquet.jpg'}
                    />
                </Col>
              </Row>
            </Carousel.Item>
          </Carousel>
        </Row>
      </div>
    );
  }
}
