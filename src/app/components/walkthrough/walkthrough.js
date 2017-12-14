import React, {Component} from 'react';

import {
  Button,
  Modal,
  Row,
  Col
} from 'react-bootstrap';

const modals = [
  {
    text: (
      <div>
        <h1><strong>¡Bienvenido(a)!</strong></h1>
        <h4>
          Esta plataforma contiene recursos digitales<br/>
          con los que puedes aprender, practicar y crear<br/>
          ¡No te los pierdas!
        </h4>
      </div>
    )
  },
  {
    text: (
      <div>
        <h4>
          Utilizando el buscador podrás encontrar<br/>
          tus recursos más fácilmente.
        </h4>
        <h4>
          En las opciones avanzadas podrás filtrar por:<br/>
          nivel, asignatura, grado y tipo de recurso.<br/>
        </h4>
        <h3><strong>¡Pruébalo!</strong></h3>
      </div>
    )
  },
  {
    text: (
      <div>
        <h3 className="h4"><strong>¡También nos puedes visitar desde tu tablet!</strong></h3>
      </div>
    )
  }
];

export class Walkthrough extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      modalId: 0
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  handleClose() {
    this.setState({showModal: false});
  }

  handleOpen() {
    this.setState({showModal: true});
  }

  handleNext() {
    const numModals = modals.length;
    let currentId = this.state.modalId + 1;
    let showingModal = true;

    if (currentId >= numModals) {
      currentId = 0;
      showingModal = false;
    }

    this.setState({
      modalId: currentId,
      showModal: showingModal
    });
  }

  render() {
    const numModals = modals.length - 1;
    return (
      <Modal backdrop="static" show={this.state.showModal} onHide={this.handleClose} bsSize="large" className="walkthrough">
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              {modals[this.state.modalId].text}
              <img src={`../app/img/walk-through/modal${this.state.modalId + 1}.png`}/>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Row className="show-grid text-center">
            <Col xs={10} sm={4} xsOffset={1} smOffset={2}>
              <Button bsStyle="aux" className="btn-radius" onClick={this.handleClose} block>
                Saltar
              </Button>
            </Col>
            <Col xs={10} sm={4} xsOffset={1} smOffset={0}>
              <Button bsStyle="primary" className="btn-radius" onClick={this.handleNext} block>
                {this.state.modalId >= numModals ? 'Cerrar' : 'Siguiente'}
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    );
  }
}
