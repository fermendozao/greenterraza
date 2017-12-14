import React, {Component} from 'react';
import {Link} from 'react-router';
import {Collapse} from 'react-bootstrap';

const leadUrl = "http://iniciativas.aprende.edu.mx";
const leadUrlProjects = `${leadUrl}/Proyectos`;

const teachingUrl = "http://docentes.aprende.edu.mx";
const teachingUrlTraining = `${teachingUrl}/Formacion`;

export class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      tic: false,
      resources: false,
      initiatives: false
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(event) {
    event.preventDefault();

    const elementClicked = event.target.getAttribute('id');

    const elements = Object.keys(this.state);

    elements.forEach(element => {
      if (element === elementClicked) {
        this.setState({
          [element]: !this.state[element]
        });
      } else {
        this.setState({
          [element]: false
        });
      }
    });
  }

  render() {
    const {tic, resources, initiatives} = this.state;
    return (
      <div id="sidebar-wrapper">
        <ul className="sidebar-nav">
          <li>
            <i className="icon icon-home"></i>
            <span>
              <a href="http://aprende.edu.mx">Inicio</a>
            </span>
          </li>
          <li>
            <i className="icon icon-teacher-training">
            </i>
            <span>
              <a
                href="#"
                onClick={this.handleToggle}
                id="tic"
                >
                Desarrollo Profesional en TIC
              </a>
            </span>
            <Collapse in={tic}>
              <ul>
                <li>
                  <a href={`${teachingUrl}`}>
                    Principal
                  </a>
                </li>
                <li>
                  <a href={`${teachingUrlTraining}/proceso`}>
                    Oferta <br/> educativa
                  </a>
                </li>
                <li>
                  <a href={`${teachingUrlTraining}/habilidades`}>
                    Habilidades <br/> digitales
                  </a>
                </li>
                <li>
                  <a href={`${teachingUrlTraining}/gestionar`}>
                    Gestiona tu <br/> clase
                  </a>
                </li>
                <li>
                  <a href={`${teachingUrlTraining}/promover`}>
                    Herramientas <br/> educativas
                  </a>
                </li>
                <li>
                  <a href={`${teachingUrlTraining}/evaluacion`}>
                    Evaluación
                  </a>
                </li>
                <li>
                  <a href={`${teachingUrlTraining}/certificacion`}>
                    Certifícate
                  </a>
                </li>
                <li>
                  <a href={`${teachingUrlTraining}/proyecto`}>
                    Proyectos
                  </a>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <i className="icon icon-resources"></i>
            <span>
              <a
                href="#"
                onClick={this.handleToggle}
                id="resources"
                >
                Recursos educativos
              </a>
            </span>
            <Collapse in={resources}>
              <ul>
                <li>
                  <a href="/">Principal</a>
                </li>
                <li>
                  <Link to={`/recursos-populares`}>
                    Recursos <br/> populares
                  </Link>
                </li>
                <li>
                  <Link to={`/sn`} query={{news: true}}>
                    Recursos <br/> nuevos
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <i className="icon icon-special-projects">
            </i>
            <span>
              <a
                href={`${leadUrl}`}
                id="initiatives"
                >
                Iniciativas Estratégicas
              </a>
            </span>
          </li>
        </ul>
      </div>
    );
  }
}
