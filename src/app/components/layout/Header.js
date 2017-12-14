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
          </Navbar.Header>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">Eventos</NavItem>
            <NavItem eventKey={2} href="#">Servicios</NavItem>
            <NavItem eventKey={3} href="#">Contacto</NavItem>
          </Nav>
        </Navbar>
      </header>
    );
  }
}
