import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';

export class MedCurricular extends Component {
  render() {
    return (
      <div className="med-curricula--item">
        <Row>
          <Col sm={2}>
            <strong>Nivel</strong>
          </Col>
          <Col sm={10}>
            {this.props.curr.levelId.name}
          </Col>

          <Col sm={2}>
            <strong>Grado</strong>
          </Col>
          <Col sm={10}>
            {this.props.curr.gradeId.name}
          </Col>

          <Col sm={2}>
            <strong>Asignatura</strong>
          </Col>
          <Col sm={10}>
            {this.props.curr.subjectId.name}
          </Col>

          <Col sm={2}>
            <strong>Bloque</strong>
          </Col>
          <Col sm={10}>
            {this.props.curr.blockId.name}
          </Col>

          <Col sm={2}>
            <strong>Contenido</strong>
          </Col>
          <Col sm={10}>
            {this.props.curr.themeId.name}
          </Col>

        </Row>
      </div>
    );
  }
}

MedCurricular.propTypes = {
  curr: React.PropTypes.object.isRequired
};
