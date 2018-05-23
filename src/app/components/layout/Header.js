import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

export class Header extends Component {
  render() {
    return (
      <header>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">
                <img src="../assets/img/logo.svg" style={{width: '130px', marginTop: '-24px'}}/>
              </a>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} href="#/eventos">Eventos</NavItem>
              <NavItem eventKey={2} href="#"><i className="fa fa-phone"/></NavItem>
              <NavItem eventKey={3} href="#"><i className="fa fa-twitter"/></NavItem>
              <NavItem eventKey={4} href="#"><i className="fa fa-facebook"/></NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}
