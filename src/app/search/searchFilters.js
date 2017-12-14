import React, {Component} from 'react';
import {SelectFilter} from './searchAdvanced/SelectFilter.js';
import {CheckboxFilter} from './searchAdvanced/CheckboxFilter.js';
import resourcesStore from './searchAdvanced/SearchAdvancedResources';

import {autorun} from 'mobx';
import Form from 'react-router-form';
import {Row, Col, Grid, Button} from 'react-bootstrap';

export class SearchFilters extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      types: '',
      level: '',
      grade: '',
      subject: ''
    };

    this._storeName = this._storeName.bind(this);
  }

  componentDidMount() {
    const _this = this;
    autorun(() => {
      _this.setState({
        title: resourcesStore.title,
        types: resourcesStore.types,
        level: resourcesStore.level,
        grade: resourcesStore.grade,
        subject: resourcesStore.subject
      });
    });
    resourcesStore.levelName = '';
    resourcesStore.gradeName = '';
    resourcesStore.subjectName = '';
    resourcesStore.typesNames = '';
  }

  _storeName() {
    resourcesStore.titleName = resourcesStore.title;
  }

  render() {
    return (
      <div className="searchform_advanced">
        <div className="searchform_advanced--arrow"/>
        <Form
          method="GET"
          to={`/s?title=${this.state.title}&type=${this.state.types}&level=${this.state.level}&grade=${this.state.grade}&subject=${this.state.subject}`}
          onSubmit={this._storeName}
          >
          <Col xs={12} className="col-xl--10">
            <Row>
              <SelectFilter/>
            </Row>
          </Col>
          <Col xs={12}>
            <h4 className="text-center">Tipo de recurso</h4>
            <Row>
              <CheckboxFilter/>
            </Row>
            <Row className="text-center">
              <Button
                type="submit"
                bsStyle="primary"
                bsSize="large"
                className="btn-radius"
                >
                Buscar ahora
              </Button>
            </Row>
          </Col>
        </Form>
      </div>
    );
  }
}

SearchFilters.propTypes = {
  onClose: React.PropTypes.func
};
