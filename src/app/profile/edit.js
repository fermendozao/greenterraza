import React, {Component} from 'react';
import {Row, Col, Grid} from 'react-bootstrap';
import axios from 'axios';

export class Edit extends Component {
  constructor() {
    super();
    this.state = {
      municipalities: [],
      selectedState: null,
      states: [],
      selectedCountry: null,
      countries: [],
      name: '',
      fathersName: '',
      mothersName: '',
      birthday: '',
      gender: '',
      curp: '',
      country: '',
      state: '',
      municipality: '',
      zipCode: '',
      mail: '',
      password: '',
      repassword: '',
      userRole: '',
      userGender: null
    };
  }

  fetchData() {
    const url = `/me`;
    axios
      .get(`${url}`)
      .then(response => {
        console.log(response);
        this.setState({
          name: response.data.name,
          fathersName: response.data.lastName,
          gender: response.data.gender,
          curp: response.data.curp,
          country: response.data.country,
          state: response.data.state,
          municipality: response.data.municipality,
          zipCode: response.data.zipCode
        });
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            asdfsdfsd
          </Col>
        </Row>
      </Grid>
    );
  }
}
