import React, {Component} from 'react';
// react-bootstrap elements
import {Col, Row, Grid} from 'react-bootstrap';

const styles = {
  container: {
    padding: '35px 0'
  }
};

export class Accessibility extends Component {
  _toggleClass(element) {
    // The good and old JS :)
    element.classList.toggle('accessibility');
  }

  componentDidMount() {
    // The good and old JS :)
    this._toggleClass(document.getElementById('page-content-wrapper'));
  }

  componentWillUnmount() {
    // The good and old JS :)
    this._toggleClass(document.getElementById('page-content-wrapper'));
  }

  render() {
    return (
      <div style={styles.container}>
        <Grid>
          <Row>
            <Col xs="12">
              <p>El sitio de Internet aprende 2.0 <a href="http://www.recursos.aprende.edu.mx">www.recursos.aprende.edu.mx</a> está construido considerando el acceso universal para todas las personas que lo consulten, independientemente de sus capacidades físicas, sensoriales o intelectuales, así como del contexto técnico de su uso (tipo de dispositivo, programa informático, velocidad de la conexión, condiciones ambientales, etc.).</p>
              <p>
                Estamos continuamente trabajando con el objetivo de adaptar el sitio a las recomendaciones del Consorcio Mundial de la Web (W3C). Dichas recomendaciones se establecen en las Pautas de Accesibilidad al Contenido de la Web (WCAG) en su versión 2.0, las cuales son referidas en el Acuerdo por el que se establecen las Disposiciones Generales de Accesibilidad Web que deben observar las dependencias y entidades de la Administración Pública Federal.
              </p>
              <p>
                Es responsabilidad de los sitios web de las dependencias y entidades de la Administración Pública Federal el integrar pautas de accesibilidad.
              </p>
              <p>
                Pautas de Accesibilidad: <br/>
              </p>
              <ul>
                <li>Las imágenes que transmiten información relevante, cuentan con textos alternativos equivalentes.</li>
                <li>Los videos pregrabados ofrecen una descripción textual o auditiva.</li>
                <li>Los enlaces, íconos y botones cuentan con texto descriptivo.</li>
                <li>El marcado semántico se utiliza apropiadamente.</li>
                <li>Los formularios cuentan con descripciones claras.</li>
                <li>Los contenidos en movimiento se pueden controlar por el usuario.</li>
                <li>El sitio es navegable utilizando el teclado.</li>
                <li>Los contrastes de color son adecuados.</li>
                <li>La estructura del sitio y sus niveles de encabezados son comprensibles y predecibles.</li>
                <li>El sitio es compatible con herramientas de asistencia tecnológica utilizadas por personas con discapacidad.</li>
                <li>El sitio es compatible con tecnologías utilizadas por los usuarios, como versiones y tipos de navegadores web (Internet Explorer, Google Chrome, Firefox, Safari, Edge).</li>
              </ul>
              <p><b>Estándar de Accesibilidad:</b> WCAG 2.0.</p>
              <p>
                <b>Nivel de conformidad:</b><br/>
                Trabajamos para dar cumplimiento al nivel de conformidad AA de las Pautas de Accesibilidad para el Contenido Web (WCAG) 2.0.
              </p>
              <p>
                En la siguiente liga puedes consultar las Pautas de Accesibilidad para el Contenido Web (WCAG) 2.0:<br/>
                <a href="http://www.w3.org/TR/2008/REC-WCAG20-20081211/" target="_blank">http://www.w3.org/TR/2008/REC-WCAG20-20081211/.</a>
              </p>
              <p>Las tecnologías utilizadas compatibles con la accesibilidad de las que se depende para acceder al sitio son: HTML, CSS y Javascript.</p>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
