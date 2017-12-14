import React, {Component} from 'react';
// react-bootstrap elements
import {Col, Row, Grid, Table} from 'react-bootstrap';

const styles = {
  container: {
    padding: '35px 0'
  },
  ol: {
    listStyleType: 'lower-latin'
  }
};

export class Privacy extends Component {
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
              <h4>Política de Privacidad y Protección de Datos Personales.</h4>
              <p>
                La Coordinación General @prende.mx, como órgano desconcentrado de la Secretaría de Educación
                Pública, será la encargada de realizar las acciones correspondientes para brindar la protección y
                tratamiento de sus datos personales. Por esta razón, se da a conocer a sus usuarios las siguientes
                políticas, basadas en la normatividad vigente aplicable a la protección de datos personales.
              </p>
              <br/>

              <h4>Objeto.</h4>
              <p>
                La Política de Privacidad y Protección de Datos Personales, en adelante la Política de Privacidad,
                explica cómo se tratan y protegen los datos personales que sean recolectados por la Coordinación
                General @prende.mx, así como aquellos que sean recabados como parte del objetivo,
                implementación o mejora del <b>Programa de Inclusión Digital​</b>; dándole la seguridad de que sus datos
                serán almacenados en plataformas seguras y garantizándole la salvaguarda de la privacidad y los
                intereses que en ellos se relacionen.
              </p>
              <br/>

              <h4>Datos sometidos a tratamiento.</h4>
              <p>
                Los datos que se recolectan por La Coordinación General @prende.mx, en ningún caso son datos
                sensibles, y consisten en los siguientes datos: nombre, apellidos, edad, genero, fecha de nacimiento,
                CURP, dirección, número telefónico, correo electrónico, firma autógrafa y firma electrónica.
              </p>
              <br/>

              <h4>Finalidades del tratamiento de los datos personales.</h4>
              <p>Los datos personales podrán ser tratados para los siguientes fines:</p>

              <ol style={styles.ol}>
                <li>
                El cumplimiento de los objetivos del <b>Programa de Inclusión Digital</b> así como los demás
                programas a cargo de la Secretaría de Educación Pública que contengan componentes
                digitales y demás encomendados;
                </li>
                <li>Para la planeación;</li>
                <li>Para la coordinación;</li>
                <li>Para la ejecución (entrega y distribución);</li>
                <li>Para el seguimiento y verificación de su cumplimiento;</li>
                <li>Para la comprobación del beneficio proporcionado;</li>
                <li>Para fines de auditorías y evaluaciones;</li>
                <li>Habilitar sistemas para hacer comentarios;</li>
                <li>Para servicios ofrecidos como parte del Programa de Inclusión​ Digital.​</li>
                <li>
                  Herramientas, material de apoyo y recursos digitales que proporcione la Coordinación
                  General @prende.mx, como como parte de desarrollo del Programa de Inclusión​ Digital​.
                </li>
                <li>Además de otras transmisiones previstas en la Ley.</li>
              </ol>
              <br/>

              <h4>¿Para qué otras finalidades se podrán utilizar sus datos personales?</h4>
              <p>
                De manera adicional, los datos de carácter personal serán utilizados para los siguientes fines, los
                cuales no inciden directamente en la implementación del <b>Programa de Inclusión Digital​</b>, pero si
                para mejora del mismo.
              </p>
              <p>
                Levantamiento de encuestas sobre:
              </p>
              <ol style={styles.ol}>
                <li> El uso y aprovechamiento de los equipos.</li>
                <li> Para fines estadísticos e informativos.</li>
                <li> Conformación e integración de Base de datos.</li>
              </ol>
              <br/>

              <h4>Derechos ARCO.</h4>
              <p>
                En cualquier circunstancia usted podrá solicitar a la Coordinación General @prende.mx, los datos de
                carácter personal que tenga en su posesión, las finalidades y condiciones de su uso, así como la
                corrección de la información personal cuando esta sea inexacta, incompleta o desactualizada,
                asimismo podrá solicitar que la misma sea eliminada de los registros o bases de datos generados,
                cuando considere que la misma no está siendo utilizada conforme a los principios, deberes y
                obligaciones previstas en la normativa; así como oponerse al uso de sus datos personales para fines
                específicos.
              </p>
              <br/>

              <h4>¿Qué implican los derechos Arco?</h4>
              <Table bordered responsive>
                <thead>
                  <tr>
                    <th className="text-center" colSpan="2"><b>DERECHOS ARCO</b></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>A</b>cceso</td>
                    <td>
                      Conocer cuál información personal está en posesión de terceros, el estado
                      en que se encuentra y para qué fines se utiliza.
                    </td>
                  </tr>
                  <tr>
                    <td><b>R</b>ectificación</td>
                    <td>
                      Solicitar, a quien utilice datos personales que los corrija cuando sean
                      incorrectos o desactualizados.
                    </td>
                  </tr>
                  <tr>
                    <td><b>C</b>ancelación</td>
                    <td>
                      Solicitar que se eliminen los datos personales cuando no están siendo
                      utilizados adecuadamente.
                    </td>
                  </tr>
                  <tr>
                    <td><b>O</b>posición</td>
                    <td>
                      Exigir el cese del uso de la información personal.
                    </td>
                  </tr>
                </tbody>
              </Table>
              <br/>

              <p>
                Para conocer el procedimiento y requisitos para el ejercicio de los derechos ARCO, podrá ponerse en
                contacto con la Dirección General Adjunta de Soporte Legal, que dará trámite a las solicitudes para el
                ejercicio de estos derechos, y atenderá cualquier duda que pudiera tener respecto al tratamiento de
                información de carácter personal. Los datos de contacto son los siguientes:
              </p>

              <p>
                Área Dirección General Adjunta de Soporte Legal de la Coordinación General @prende.mx, con
                domicilio en Paseo de la Reforma 122, correo electrónico <a href="mailto:almendra.castro@nube.sep.gob.mx">almendra.castro@nube.sep.gob.mx</a> y
                número telefónico (55) 36011000 extensión 53365.
              </p>
              <br/>

              <h4>Responsable del tratamiento de los datos personales y fundamento para ello.</h4>
              <p>
                Los datos de carácter personal que sean utilizados para el cumplimiento de los objetivos del <b>Programa
                de Inclusión Digital</b> así como los demás programas a cargo de la Secretaría de
                Educación Pública que contengan componentes digitales y demás encomendados, y todos aquellos
                que sean utilizados para fines secundarios, se encontraran limitados solo a los servidores públicos
                involucrados en la planeación, coordinación, ejecución y evaluación periódica de los mismos;
                garantizando en todo momento la confidencialidad en el tratamiento de los datos personales que sean
                recabados, así como la implementación de mecanismos que garanticen su seguridad.
              </p>
              <p>
                Es importante mencionar que la Coordinación General @prende.mx, en ningún momento
                proporcionara la información de carácter personal de sus usuarios a ninguna empresa ni entidad
                externa. Los datos personales en posesión de la misma están protegidos por la Ley General de
                Transparencia y Acceso a la Información Pública, los Lineamientos de Protección de Datos
                Personales, la Ley Federal de Transparencia y Acceso a la Información Pública y su Reglamento.
              </p>
              <br/>

              <h4>Consentimiento en materia de protección de datos personales.</h4>
              <p>
                Los datos personales podrán ser tratados sin consentimiento de la Coordinación General
                @prende.mx, siempre en respeto a los derechos de los usuarios, y sólo por razones de seguridad
                nacional, disposiciones de orden público, seguridad y salud públicas o para proteger los derechos de
                terceros, según lo establece de esta manera, el segundo párrafo del artículo 16, de la Constitución
                Política de los Estados Unidos Mexicanos, así como en los supuestos previstos por el artículo 117 de
                la Ley Federal de Transparencia y Acceso a la Información Pública.
              </p>
              <br/>

              <h4>Cambios y actualizaciones a la Política de Privacidad.</h4>
              <p>
                La presente política de privacidad puede cambiar o actualizarse periódicamente; por lo que le
                pedimos sea revisada constantemente y pueda estar al tanto de la última versión que rige el
                tratamiento de tus datos personales. No obstante lo anterior, la presente política de privacidad
                siempre deberá observar las disposiciones jurídicas aplicables.
              </p>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
