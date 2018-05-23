import React, {Component} from 'react';
import {Row, Col, Carousel} from 'react-bootstrap';
import {Card} from '../Card/Card';

export class CarouselGallery extends Component {

  chunkArray(array, size = 6) {
    const newArray = [];
    while (array.length > 0) {
      newArray.push(array.splice(0, size));
    }
    return newArray;
  }

  render() {
    let {items} = this.props;
    items = this.chunkArray(items);
    return (
      <div className="carousel_gallery container-fluid">
        <Row>
          <Carousel
            controls={false}
            pauseOnHover
            >
            {
              items.map((carouselItem, index) => {
                return (
                  <Carousel.Item key={index}>
                    <Row>
                      {
                        carouselItem.map((item, i) => {
                          const {title, description, image} = item;
                          return (
                            <Col xs={6} md={4} key={i}>
                              <Card
                                title={title}
                                description={description}
                                image={`../../assets/${image}`}
                                />
                            </Col>
                          );
                        })
                      }
                    </Row>
                  </Carousel.Item>
                );
              })
            }
          </Carousel>
        </Row>
      </div>
    );
  }
}

CarouselGallery.propTypes = {
  items: React.PropTypes.array.isRequired
};
