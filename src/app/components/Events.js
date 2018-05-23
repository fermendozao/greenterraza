import React, {Component} from 'react';
import {Grid, Row, Col, Button, ButtonToolbar, ButtonGroup, DropdownButton, MenuItem} from 'react-bootstrap';
import {Card} from './Card/Card';
import {flowers} from '../../constants';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      category: null,
      specificCategory: null,
      buttons: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(category, specificCategory) {
    if (specificCategory) {
      this.setState({category, specificCategory: `${specificCategory}`, cards: flowers[category][specificCategory]});
    } else {
      this.setState({category, specificCategory: "", cards: flowers[category]});
    }
  }

  componentWillMount() {
    const buttons = Object.keys(flowers).map((category, index) => {
      let button;
      if (flowers[category] instanceof Array) {
        button = <Button key={index} onClick={() => this.handleClick(category)} className="btn btn-default">{category}</Button>; // eslint-disable-line
      } else {
        button = (<DropdownButton title={category} key={index}>
          {
            Object.keys(flowers[category]).map((element, i) => {
              return (<MenuItem key={i} onClick={() => this.handleClick(category, element)}>{element}</MenuItem>); // eslint-disable-line
            })
          }
        </DropdownButton>);
      }
      return button;
    });
    this.setState({buttons});
  }

  render() {
    const {cards, category, specificCategory, buttons} = this.state;
    return (
      <Grid style={{marginTop: '100px'}} className="events">
        <Row>
          <Col><h1>Eventos</h1></Col>
        </Row>

        <Row>
          <Col xs={12} mdHidden lgHidden>
            <ButtonToolbar>
              <ButtonGroup>
                {buttons}
              </ButtonGroup>
            </ButtonToolbar>
          </Col>
          <Col smHidden xsHidden md={3} >
            <ButtonGroup vertical>
              {buttons}
            </ButtonGroup>
          </Col>
          <Col xs={12} md={9}>
            <Row>
              <Col md={12}>
                {category &&
                  <div className="breadcrumb">
                    <span>{category}</span>
                    <span>{specificCategory}</span>
                  </div>
                }
              </Col>
            </Row>
            <Row>
              <Grid fluid>
                {
                  cards.map((flower, index) => {
                    let route = `../../assets/floreria/${category}`;
                    route = specificCategory.length ? `${route}/${specificCategory}/${flower}` : `${route}/${flower}`;
                    return (
                      <Col xs={6} md={4} key={index}>
                        <Card
                          image={route}
                          modal
                          />
                      </Col>
                    );
                  })
                }
              </Grid>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Events;
