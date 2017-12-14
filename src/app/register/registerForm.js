import React, {Component, PropTypes} from 'react';

import {gender, roles} from './select-data';

import axios from 'axios';
import moment from 'moment';
import Formsy from 'formsy-react';
import {OptionSelect} from '../search/searchAdvanced/OptionSelect';
import {Input, Select, Checkbox} from 'formsy-react-components';
import {Button, Form, FormGroup, ControlLabel, HelpBlock, Row, Col, Tooltip, OverlayTrigger} from 'react-bootstrap';

// Set location/language
moment.locale('es-MX');

const styles = {
  small: {
    fontSize: '80%',
    margin: '0'
  }
};

// Curp validation rule
Formsy.addValidationRule('isCurp', (values, value) => {
  const regex = /^[a-zA-Z]{4}\d{6}[HM][a-zA-Z]{5}[0-9A-Z]{1}\d{1}$/i;
  return regex.test(value);
});

export class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      email: null,
      municipality: null,
      state: null,
      country: null,
      name: null,
      lastName: null,
      secondLastName: null,
      countries: [],
      states: [],
      municipalities: [],
      canSubmit: false,
      isSent: false,
      hasError: false,
      date: null,
      recaptcha: null,
      convertedDate: null,
      userRole: null,
      userGender: null,
      selectedCountry: null,
      selectedState: null,
      selectedMunicipality: null,
      textError: 'El CURP debe ser único \n El email debe ser único',
      isSentUpdate: null
    };

    this.handleEnableButton = this.handleEnableButton.bind(this);
    this.handleDisableButton = this.handleDisableButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangingDate = this.handleChangingDate.bind(this);
    this.handleRecaptcha = this.handleRecaptcha.bind(this);
    this.handleRecaptchaExpire = this.handleRecaptchaExpire.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleMunicipalityChange = this.handleMunicipalityChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleUserRoleChange = this.handleUserRoleChange.bind(this);
  }

  handleEnableButton() {
    this.setState({
      canSubmit: true,
      textError: '',
      hasError: false
    });
  }

  handleDisableButton() {
    this.setState({
      canSubmit: false,
      textError: '',
      hasError: false
    });
  }

  handleSubmit(data) {
    const _this = this;
    if (data.confirmPassword === data.password) {
      delete data.confirmPassword;
      delete data.terms;

      if (this.props.classType === 'edit-form') {
        axios
          .patch('/me', data)
          .then(() => {
            _this.setState({
              textError: '',
              hasError: false,
              isSentUpdate: true
            });
            window.location.reload();
          })
          .catch(error => {
            _this.setState({
              textError: '',
              hasError: true,
              isSentUpdate: false
            });
          });
      } else {
        axios.post('/register', data)
        .then(() => {
          _this.setState({
            textError: '',
            hasError: false,
            isSent: true
          });
        })
        .catch(errors => {
          let str = '';
          for (const key in errors.data) {
            if (errors.data.hasOwnProperty(key)) {
              if (errors.data[key] === "User with this email already exists.") {
                str += "Ya se ha registrado un usuario con esta dirección de correo";
              }
            }
          }
          _this.setState({
            textError: str,
            hasError: true
          });
        });
      }
    }
  }

  handleRecaptcha() {
    this.setState({recaptcha: true});
  }

  handleRecaptchaExpire() {
    this.setState({recaptcha: false});
  }

  handleChangingDate(resultingDate) {
    this.setState({
      convertedDate: resultingDate.format('YYYY-MM-DD'),
      date: resultingDate
    });
  }

  handleGenderChange(option) {
    this.setState({userGender: option.value});
  }

  handleUserRoleChange(option) {
    this.setState({userRole: option.value});
  }

  handleCountryChange(option) {
    this.setState({selectedCountry: option.value});
    // Reset states select if active
    if (this.state.states.length > 0) {
      this.refs.statesReset.resetSelect();
    }
    this.fetchCountries(option);
  }

  handleStateChange(option) {
    this.setState({selectedState: option.value});
    // Reset municipalities select if active
    if (this.state.municipalities.length > 0 && this.props.classType !== 'edit-form') {
      this.refs.municipalitiesReset.resetSelect();
    }
    this.fetchMunicipalities(option);
  }

  handleMunicipalityChange(option) {
    this.setState({selectedMunicipality: option.value});
  }

  componentDidMount() {
    axios
      .get('/countries')
      .then(response => {
        this.setState({countries: response.data.results});
      })
      .catch(error => {
        console.log(`Error fetching data ${error}`);
      });

    const classType = this.props.classType;
    if (classType === "edit-form") {
      this.fetchData();
    }
  }

  componentWillReceiveProps(nextProps) {
    const classType = nextProps.classType;
    if (classType === "edit-form") {
      this.fetchData();
    }
  }

  fetchData() {
    const url = `/me`;
    axios
      .get(`${url}`)
      .then(response => {
        if (response.data.country.id === 1) {
          this.fetchCountries();
        }
        this.setState({
          selectedMunicipality: response.data.municipality.id.toString(),
          selectedState: response.data.state.id.toString(),
          selectedCountry: response.data.country.id.toString(),
          convertedDate: response.data.birthday,
          date: moment(response.data.birthday),
          country: response.data.country,
          curp: response.data.curp,
          lastName: response.data.lastName,
          userGender: response.data.gender,
          email: response.data.email,
          secondLastName: response.data.secondLastName,
          municipality: response.data.municipality,
          name: response.data.name,
          state: response.data.state,
          zipCode: response.data.zipCode,
          userRole: response.data.userRole.id.toString()
        });
      });
  }

  fetchCountries(option) {
    if (option) {
      // If option is Mexico, show states select
      if (option.value === "1") {
        axios
          .get('/countries/1/states')
          .then(response => {
            this.setState({states: response.data.results});
          })
          .catch(error => {
            console.log(`Error fetching data ${error}`);
          });
      }
    } else {
      axios
        .get('/countries/1/states')
        .then(response => {
          this.setState({states: response.data.results});
          this.fetchMunicipalities();
        })
        .catch(error => {
          console.log(`Error fetching data ${error}`);
        });
    }
  }

  fetchMunicipalities(option) {
    if (option) {
      // Get munipialities of selected state
      axios
        .get(`/countries/1/states/${option.value}/municipalities`)
        .then(response => {
          this.setState({municipalities: response.data.results});
        })
        .catch(error => {
          console.log(`Error fetching data ${error}`);
        });
    } else {
      // Get munipialities of selected state
      axios
        .get(`/countries/1/states/${this.state.state.id}/municipalities`)
        .then(response => {
          this.setState({municipalities: response.data.results});
        })
        .catch(error => {
          console.log(`Error fetching data ${error}`);
        });
    }
  }

  render() {
    let content;
    let error;
    if (this.state.hasError) {
      error = (
        <div className="hasError">
          {this.state.textError.split('\n').map((item, idx) => {
            return <p key={idx}>{item}</p>;
          })}
        </div>
      );
    } else {
      error = <div></div>;
    }

    if (this.state.isSent) {
      content = (
        <div className="registerForm--success">
          <div className="text-center">
            <span className="fa fa-check-circle"></span>
            <h2>Tu registro se ha completado.</h2>
          </div>
          <p>Te hemos enviado un correo de verificación. Utiliza el enlace que encontraras allí para activar tu cuenta.</p>
          <p>Si no recibes el e-mail de verificación, por favor comprueba tu carpeta de correo no deseado porque puede que lo hayas recibido como publicidad.</p>
        </div>
      );
    } else {
      content = (
        <Formsy.Form className="registerForm form-horizontal" onSubmit={this.handleSubmit} onValid={this.handleEnableButton} onInvalid={this.handleDisableButton}>
          {this.props.classType === undefined &&
            <div>
              <h4>
                Queremos brindarte la mejor atención<br/>
                para ello necesitamos la siguiente información
              </h4>
              <hr/>
            </div>
          }
          <fieldset>
            <legend>Datos personales:</legend>
            <Col xs={12} sm={this.props.classType ? 3 : 5}>
              <FormGroup>
                <Input
                  name="name"
                  layout="elementOnly"
                  type="text"
                  placeholder="Nombre*"
                  value={this.state.name}
                  autoComplete="off"
                  validations={{
                    isSpecialWords: true,
                    maxLength: 25
                  }}
                  required
                  />
              </FormGroup>

              <FormGroup>
                <Input
                  name="last_name"
                  layout="elementOnly"
                  type="text"
                  placeholder="Apellido paterno*"
                  value={this.state.lastName}
                  autoComplete="off"
                  validations={{
                    isSpecialWords: true,
                    maxLength: 25
                  }}
                  required
                  />
              </FormGroup>

              <FormGroup>
                <Input
                  name="second_last_name"
                  layout="elementOnly"
                  type="text"
                  placeholder="Apellido materno"
                  value={this.state.secondLastName}
                  autoComplete="off"
                  validations={{
                    isSpecialWords: true,
                    maxLength: 25
                  }}
                  />
              </FormGroup>
            </Col>

            <Col xs={12} sm={this.props.classType ? 3 : 5} smOffset={1}>
              <FormGroup>
                <Input
                  name="birthday"
                  layout="elementOnly"
                  type="hidden"
                  value={this.state.convertedDate}
                  required
                  />
              </FormGroup>

              <FormGroup>
                <Input
                  name="gender"
                  layout="vertical"
                  type="hidden"
                  value={this.state.userGender}
                  required
                  />
                {this.state.userGender === null &&
                  <OptionSelect
                    options={gender}
                    onHandleChange={this.handleGenderChange}
                    resetLabel="Sexo*"
                    />
                }
                {this.state.userGender !== null &&
                  <OptionSelect
                    options={gender}
                    onHandleChange={this.handleGenderChange}
                    defaultValue={this.state.userGender}
                    resetLabel="Sexo*"
                    />
                }
              </FormGroup>

              <Input
                name="curp"
                layout="vertical"
                type="text"
                placeholder="CURP*"
                value={this.state.curp}
                validations="isCurp"
                validationErrors={{
                  isCurp: "Verifica el formato de tu CURP"
                }}
                required
                />
              <FormGroup>
                <p style={styles.small}>¿No conoces tu CURP? obténlo <a href="https://consultas.curp.gob.mx/CurpSP/" target="_blank">aquí</a></p>
              </FormGroup>
            </Col>
          </fieldset>

          <fieldset>
            <legend>Ubicación:</legend>
            <Col xs={12} sm={this.props.classType ? 3 : 5}>
              <FormGroup>
                <Input
                  name="country"
                  layout="elementOnly"
                  type="hidden"
                  value={this.state.selectedCountry}
                  required
                  />
                {this.state.country === null &&
                  <OptionSelect
                    options={this.state.countries}
                    onHandleChange={this.handleCountryChange}
                    resetLabel="Pais*"
                    ref="countriesReset"
                    />
                }
                {this.state.country !== null &&
                  <OptionSelect
                    options={this.state.countries}
                    onHandleChange={this.handleCountryChange}
                    defaultValue={this.state.country.id}
                    resetLabel="Pais*"
                    ref="countriesReset"
                    />
                }
              </FormGroup>

              {this.state.states.length > 0 &&
                <FormGroup>
                  <Input
                    name="state"
                    layout="vertical"
                    type="hidden"
                    value={this.state.selectedState}
                    required
                    />
                  {this.state.state === null &&
                    <OptionSelect
                      options={this.state.states}
                      onHandleChange={this.handleStateChange}
                      resetLabel="Estado*"
                      ref="statesReset"
                      />
                  }
                  {this.state.state !== null &&
                    <OptionSelect
                      options={this.state.states}
                      onHandleChange={this.handleStateChange}
                      defaultValue={this.state.state.id}
                      resetLabel="Estado*"
                      ref="statesReset"
                      />
                  }
                </FormGroup>
              }
            </Col>

            <Col xs={12} sm={this.props.classType ? 3 : 5} smOffset={1}>
              {this.state.municipalities.length > 0 &&
                <FormGroup>
                  <Input
                    name="municipality"
                    layout="elementOnly"
                    type="hidden"
                    value={this.state.selectedMunicipality}
                    required
                    />
                  {this.state.municipality === null &&
                    <OptionSelect
                      options={this.state.municipalities}
                      onHandleChange={this.handleMunicipalityChange}
                      resetLabel="Municipio*"
                      ref="municipalitiesReset"
                      />
                  }
                  {this.state.municipality !== null &&
                    <OptionSelect
                      options={this.state.municipalities}
                      onHandleChange={this.handleMunicipalityChange}
                      defaultValue={this.state.municipality.id}
                      resetLabel="Municipio*"
                      ref="municipalitiesReset"
                      />
                  }
                </FormGroup>
              }

              <Input
                name="zip_code"
                type="text"
                layout="vertical"
                placeholder="Código Postal*"
                value={this.state.zipCode}
                autoComplete="off"
                validations={{
                  isNumeric: true,
                  minLength: 5,
                  maxLength: 5
                }}
                validationErrors={{
                  isNumeric: "Utiliza dígitos solamente.",
                  minLength: "Tu CP debe de ser de 5 dígitos.",
                  maxLength: "Tu CP debe de ser de 5 dígitos."
                }}
                required
                />
            </Col>
          </fieldset>

          <fieldset>
            <legend>Usuario:</legend>
            <Col xs={12} sm={this.props.classType ? 3 : 5}>
              <Input
                name="email"
                type="email"
                layout="vertical"
                autoComplete="off"
                placeholder="Correo electrónico*"
                value={this.state.email}
                validations="isEmail"
                validationErrors={{
                  isEmail: "Verifica el formato de tu email."
                }}
                required
                />

              {this.props.classType !== 'edit-form' &&
                <OverlayTrigger
                  placement="right"
                  overlay={<Tooltip id="tooltip">Escoge una contraseña segura y fácil de recordar. Se requiere que utilice por lo menos 6 caracteres. Te recomendamos utilizar una combinación de letras (mayúsculas y minúsculas) y números</Tooltip>}
                  >
                  <Input
                    name="password"
                    layout="vertical"
                    type="password"
                    validations={{
                      minLength: 6,
                      maxLength: 12,
                      isExisty: true
                    }}
                    validationErrors={{
                      minLength: "La contraseña debe tener al menos 6 caracteres",
                      maxLength: "La contraseña debe de tener máximo 12 caracteres"
                    }}
                    placeholder="Contraseña*"
                    required
                    />
                </OverlayTrigger>
              }
                {this.props.classType !== 'edit-form' &&
                  <Input
                    name="confirmPassword"
                    layout="vertical"
                    type="password"
                    validations="equalsField:password"
                    validationErrors={{
                      equalsField: "Las contraseñas deben de coincidir"
                    }}
                    placeholder="Confirmar tu contraseña*"
                    required
                    />
                }
            </Col>

            <Col xs={12} sm={this.props.classType ? 3 : 5} smOffset={1}>
              <FormGroup>
                <Input
                  name="user_role"
                  layout="vertical"
                  type="hidden"
                  value={this.state.userRole}
                  required
                  />
                {this.state.userRole === null &&
                  <OptionSelect
                    options={roles}
                    onHandleChange={this.handleUserRoleChange}
                    resetLabel="Usuario*"
                    />
                }
                {this.state.userRole !== null &&
                  <OptionSelect
                    options={roles}
                    onHandleChange={this.handleUserRoleChange}
                    defaultValue={this.state.userRole}
                    resetLabel="Usuario*"
                    />
                }
              </FormGroup>

              {this.state.userRole === '4' &&
                <Input
                  name="name_cct"
                  layout="vertical"
                  type="text"
                  placeholder="Nombre CCT"
                  autoComplete="off"
                  validations={{
                    isExisty: true,
                    maxLength: 100
                  }}
                  required
                  />
              }

              {this.state.userRole === '4' &&
                <div>
                  <Input
                    name="number_cct"
                    layout="vertical"
                    type="text"
                    autoComplete="off"
                    validations={{
                      maxLength: 10,
                      minLength: 10,
                      isExisty: true
                    }}
                    validationErrors={{
                      isAlpha: 'Sólo números',
                      minLength: 'Mínimo 10 dígitos',
                      maxLength: 'Máximo 10 dígitos'
                    }}
                    placeholder="Número CCT*"
                    required
                    />
                  <FormGroup>
                    <p style={styles.small}>¿No conoces tu número CCT? obténlo <a href="http://www.snie.sep.gob.mx/SNIESC/" target="_blank">aquí</a></p>
                  </FormGroup>
                </div>
              }
            </Col>
          </fieldset>

          {this.props.classType === undefined &&
            <fieldset>
              <Col xs={12}>
                <FormGroup>
                  <div className="inline pull-left">
                    <Checkbox
                      name="terms"
                      layout="elementOnly"
                      value={false}
                      validations="isTrue"
                      required
                      />
                  </div>
                  <span className="privacy-policy">Acepto los <a href="/assets/politica-privacidad.pdf" target="_blank">términos y condiciones</a>.</span>
                </FormGroup>

                <FormGroup>
                  <Input
                    name="recaptcha"
                    layout="elementOnly"
                    type="hidden"
                    value={this.state.recaptcha}
                    validations="isTrue"
                    required
                    />
                </FormGroup>
              </Col>
            </fieldset>
          }

          {error}
          <br/>
          <fieldset>
            <Col xs={12} md={6} mdOffset={3}>
              {this.state.isSentUpdate !== null && this.state.isSentUpdate === true &&
                <h1>Tus datos se han actualizado.</h1>
              }
              {this.state.isSentUpdate !== null && this.state.isSentUpdate === false &&
                <h1>Hubo un error al tratar de actualizar tus datos, por favor intentalo más tarde.</h1>
              }
              <FormGroup>
                <Button
                  block
                  type="submit"
                  bsStyle="primary"
                  bsSize="large"
                  className="btn-radius"
                  disabled={!this.state.canSubmit}
                  >
                  {this.props.classType === undefined &&
                    "Registrarme"
                  }
                  {this.props.classType === "edit-form" &&
                    "Guardar"
                  }
                </Button>
              </FormGroup>
            </Col>
          </fieldset>
        </Formsy.Form>
      );
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}

RegisterForm.propTypes = {
  classType: PropTypes.string
};
