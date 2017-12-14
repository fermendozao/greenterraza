import React, {Component} from 'react';
import {SearchFilters} from '../search/searchFilters.js';
import resourcesStore from './searchAdvanced/SearchAdvancedResources';
import {autorun} from 'mobx';
import Form from 'react-router-form';
// react-bootstrap elements
import {Col, Grid, Button, FormGroup, FormControl, InputGroup, Overlay} from 'react-bootstrap';

const styles = {
  searchForm: {
    padding: '20px 15px 2px',
    background: 'rgba(0,0,0,.4)',
    margin: '20px 0',
    borderRadius: '10px'
  },
  searchFormInput: {
    border: '2px solid #616161',
    borderRadius: '10px'
  },
  blueButton: {
    borderRadius: '5px',
    width: '49px',
    height: '49px',
    marginLeft: '10px',
    position: 'relative',
    border: '2px solid #175AA7'
  },
  purpleButton: {
    borderRadius: '5px',
    width: '49px',
    height: '49px',
    marginLeft: '10px',
    position: 'relative',
    border: '2px solid #65318F'
  }
};

export class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      searchValue: '',
      types: '',
      level: '',
      grade: '',
      subject: ''
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
    this._handleResourcesStoreNames = this._handleResourcesStoreNames.bind(this);
    this._handleHide = this._handleHide.bind(this);
  }

  handleSearchValueChange(event) {
    this.setState({
      searchValue: event.target.value
    });
    resourcesStore.title = event.target.value;
  }

  handleToggle() {
    this.setState({show: !this.state.show});
    resourcesStore.show = !this.state.show;
  }

  // This handle is necessary because always the 'onHide' function of the Overlay
  // is fired either with 'handleToggle' or with the prop 'rootClose'
  _handleHide() {
    this.setState({show: false});
    resourcesStore.show = false;
  }

  componentDidMount() {
    const _this = this;
    autorun(() => {
      _this.setState({
        searchValue: resourcesStore.title,
        types: resourcesStore.types,
        level: resourcesStore.level,
        grade: resourcesStore.grade,
        subject: resourcesStore.subject,
        show: resourcesStore.show
      });
    });
  }

  _handleResourcesStoreNames() {
    resourcesStore.titleName = resourcesStore.title;
    resourcesStore.levelName = '';
    resourcesStore.gradeName = '';
    resourcesStore.subjectName = '';
    resourcesStore.typesNames = '';
  }

  render() {
    let searchQuery;
    if (this.state.show) {
      searchQuery = `?title=${this.state.searchValue}`;
      searchQuery+= `&type=${this.state.types}`;
      searchQuery+= `&level=${this.state.level}`;
      searchQuery+= `&grade=${this.state.grade}`;
      searchQuery+= `&subject=${this.state.subject}`;
    } else {
      searchQuery = `?title=${this.state.searchValue}`;
    }

    return (
      <div className="searchform">
        <Grid>
          <Col sm={12} md={8} mdOffset={2} lg={8} className="col-xl-8" ref="container">
            <Form
              style={styles.searchForm}
              method="GET"
              to={`/s${searchQuery}`}
              onSubmit={this._handleResourcesStoreNames}
              >
              <FormGroup bsSize="large">
                <InputGroup>
                  <FormControl
                    type="text"
                    style={styles.searchFormInput}
                    value={this.state.searchValue}
                    onChange={this.handleSearchValueChange}
                    placeholder="¿Qué estás buscando?"
                    />
                  <InputGroup.Button>
                    <Button
                      type="submit"
                      bsStyle="primary"
                      bsSize="large"
                      style={styles.blueButton}
                      className="search"
                      />

                    <Button
                      bsStyle="info"
                      bsSize="large"
                      className="search-advanced"
                      style={styles.purpleButton}
                      onClick={this.handleToggle}
                      />

                    <Overlay
                      show={this.state.show}
                      trigger="click"
                      onHide={this._handleHide}
                      rootClose={true}
                      placement="bottom"
                      container={()=>this.refs.container}
                      >
                      <SearchFilters onClose={this.handleToggle}/>
                    </Overlay>

                  </InputGroup.Button>
                </InputGroup>
              </FormGroup>
            </Form>
          </Col>
        </Grid>
      </div>
    );
  }
}
