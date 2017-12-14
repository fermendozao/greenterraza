import React, {Component} from 'react';
import {Col, Row, Grid, Tabs, Tab} from 'react-bootstrap';
import {Favs} from './favorites';
import {History} from './history';
import {Suggestions} from './suggestions';
import {RegisterForm} from '../register/registerForm';

export class Profile extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs="12">
              <Tabs>
                <Tab eventKey={1} title="Favoritos">
                  <Favs/>
                </Tab>
                <Tab eventKey={2} title="Sugerencias">
                  <Suggestions/>
                </Tab>
                <Tab eventKey={3} title="Historial">
                  <History/>
                </Tab>
                <Tab eventKey={4} title="Editar">
                  <Row>
                    <RegisterForm classType="edit-form"/>
                  </Row>
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
