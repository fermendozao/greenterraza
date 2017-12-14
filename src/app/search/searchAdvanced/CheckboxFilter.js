import React, {Component} from 'react';
import {FormGroup, Checkbox, Col} from 'react-bootstrap';
import resourcesStore from './SearchAdvancedResources';

export class CheckboxFilter extends Component {
  constructor() {
    super();
    this.state = {
      selectedTypes: [],
      selectedTypesNames: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const checkboxes = this.state.selectedTypes;
    const names = this.state.selectedTypesNames;
    if (e.target.checked) {
      const value = e.target.value;
      checkboxes.push(value);
      // Case for storage the name of the Value
      let name;
      switch(value) {
        case "1":
          name = 'Interactivo';
          break;
        case "2":
          name = 'Video';
          break;
        case "3":
          name = 'Aplicaciones';
          break;
        case "4":
          name = 'Audio';
          break;
        case "5":
          name = 'Dcoumento';
          break;
      }
      names.push(name);
      // Set state
      this.setState({
        selectedTypes: checkboxes,
        selectedTypesNames: names
      });
    } else {
      const value = e.target.value;
      const index = this.state.selectedTypes.indexOf(value);
      const indexName = this.state.selectedTypesNames.indexOf(value);
      checkboxes.splice(index, 1);
      names.splice(indexName, 1);
    }
    resourcesStore.types = this.state.selectedTypes.join(',');
    resourcesStore.typesNames = this.state.selectedTypesNames.join(', ');
  }

  render() {
    return (
      <FormGroup className="search-checkboxes" onChange={this.handleChange}>
        <Col xs={4} xsOffset={1} md={2} className="text-center">
          <Checkbox value="1" inline>
            <span className="med-icon med-icon--interactivo"></span>
            Interactivo
          </Checkbox>
        {' '}
        </Col>

        <Col xs={4} md={2} className="text-center">
          <Checkbox value="3" inline>
            <span className="med-icon med-icon--aplicaciones"></span>
            Aplicaciones
          </Checkbox>
          {' '}
        </Col>

        <Col xs={4} md={2} className="text-center">
          <Checkbox value="4" inline>
            <span className="med-icon med-icon--audio"></span>
            Audio
          </Checkbox>
          {' '}
        </Col>

        <Col xs={4} md={2} className="text-center">
          <Checkbox value="5" inline>
            <span className="med-icon med-icon--documento"></span>
            Documento
          </Checkbox>
          {' '}
        </Col>

        <Col xs={4} md={2} className="text-center">
          <Checkbox value="2" inline>
            <span className="med-icon med-icon--video"></span>
            Video
          </Checkbox>
          {' '}
        </Col>
      </FormGroup>
    );
  }
}
