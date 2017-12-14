import React, {Component} from 'react';
import {MedKeyword} from './MedKeyword';
import {MedCurricular} from './MedCurricular';
import {MedComments} from './MedComments';
import {SocialShare} from '../components/socialShare/socialShare.js';
import {Med} from './med';
import userStore from '../user.js';

import axios from 'axios';
import {autorun} from 'mobx';
import {Link} from 'react-router';
import {Row, Col, Grid, Tabs, Tab} from 'react-bootstrap';

const styles = {
  buttonGroup: {
    marginBottom: '50px'
  },
  button: {
    marginBottom: '18px'
  },
  notice: {
    color: '#a20539',
    fontSize: '11.5px'
  },
  desc: {
    margin: '40px 0 20px 0',
    textAlign: 'justify'
  },
  donor: {
    color: '#616161',
    fontWeight: 'bold',
    marginBottom: '13px',
    display: 'block',
    paddingLeft: '8px'
  },
  prevButton: {
    display: 'inline-block',
    marginBottom: '30px',
    color: '#616161'
  }
};

export class MedDetails extends Component {
  constructor() {
    super();
    this.state = {
      med: {},
      medType: {},
      medKeywords: [],
      medCurricular: [],
      medResources: [],
      allowDownloading: false,
      allowOpening: false,
      referenceUrl: '',
      donorWebsite: '',
      donatedBy: '',
      loggedIn: false
    };
    this.handleGoBack = this.handleGoBack.bind(this);
    this.postFavorites = this.postFavorites.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }

  handleGoBack() {
    window.history.back();
  }

  fetchData(medId) {
    axios
      .get(`/meds/${medId}`)
      .then(response => {
        this.setState({
          med: response.data,
          medType: response.data.typeClass,
          medKeywords: response.data.keywords,
          medCurricular: response.data.curricularAligments,
          allowOpening: response.data.allowOpening,
          allowDownloading: response.data.allowDownloading,
          referenceUrl: response.data.referenceUrl,
          donorWebsite: response.data.donorWebsite,
          donatedBy: response.data.donatedBy
        });
      });

    axios
    .get(`/meds/${medId}/favorite`)
    .then(response => {
      this.setState({
        isFavorite: response.data.isFavorite
      });
    });

    axios
      .get(`/meds/${medId}/resources`)
      .then(response => {
        this.setState({
          medResources: response.data.results[0]
        });
      });
  }

  postFavorites() {
    const medId = this.props.params.med_id;
    axios
      .post(`/meds/${medId}/favorite`)
      .then(() => {
        this.setState({
          isFavorite: true
        });
      });
  }

  handleDownload(e) {
    e.preventDefault();
    const medId = this.state.med.id;
    const medAttUrl = this.state.medResources.attachedFile;
    const eventButton = e.currentTarget;
    eventButton.innerHTML = 'Descargando...';
    eventButton.setAttribute('disabled', 'disabled');
    axios
      .post(`/meds/actions/${medId}/download`)
      .then(() => {
        setTimeout(() => {
          // Get file name from url.
          const filename = medAttUrl.substring(medAttUrl.lastIndexOf("/") + 1).split("?")[0];
          const xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = () => {
            const a = document.createElement('a');
            a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
            a.download = filename; // Set the file name.
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            eventButton.innerHTML = 'Descargar';
            eventButton.removeAttribute('disabled');
          };
          xhr.open('GET', medAttUrl);
          xhr.send();
        }, 1000);
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    const medId = this.props.params.med_id;
    if (medId && medId !== undefined || medId !== "undefined") {
      this.fetchData(medId);
    }

    const _this = this;
    autorun(() => {
      if (typeof userStore.me.name !== 'undefined') {
        _this.setState({
          loggedIn: true
        });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const medId = nextProps.params.med_id;
    if (medId && medId !== undefined || medId !== "undefined") {
      this.fetchData(medId);
    }
  }

  render() {
    const openString = 'Abrir Recurso';
    const medUrl = window.location.href;
    let prevButton;
    let medResource;
    let medResourceDownload;

    /*
     * Show prev button if prev path is from Search component
     */
    if (this.props.location.query.prevPath === "/s") {
      prevButton = (
        <Row>
          <Col xs={12}>
            <i className="fa fa-caret-left" aria-hidden="true"></i>
            {' '}
            <a onClick={this.handleGoBack} style={styles.prevButton}>Regresar a la búsqueda</a>
          </Col>
        </Row>
      );
    }

    /*
     * Show download button only when response is true
     */
    if (this.state.allowDownloading) {
      medResource = this.state.medResources.attachedFile;
      medResourceDownload = (
        <button
          onClick={this.handleDownload}
          className="btn-radius btn-block btn btn-lg btn-primary"
          >
          Descargar
        </button>
      );
    }

    /*
     * Create MED keywords
     */
    let medKeywords = this.state.medKeywords.map((keyword, i) => (
      <MedKeyword key={i} keyword={keyword}/>
    ));

    /*
     * Create MED curricula
     */
    let medCurricular = this.state.medCurricular.map((curr, i) => (
      <MedCurricular key={i} curr={curr} med={this.props.params.med_id}/>
    ));

    let medResourceEmbed;
    let medNotice;
    let medResourceUrl;
    let isExternal;

    const {referenceUrl, donorWebsite, donatedBy} = this.state;

    /*
     * If server response says that this resource should be opened, show a
     * link to the right component (depending on medType)
     * If server response says that this resource shouldn't be opened, show a
     * link to the external resource
     */
    if (this.state.allowOpening) {
      isExternal = false;
      switch (this.state.medType.id) {
        // Interactive MED type
        case 1:
          medResourceUrl = `${this.state.medResources.uncompressedDirectory}/index.html`;
          medResourceEmbed = (
            <a
              target="_blank"
              href={medResourceUrl}
              style={styles.button}
              className="btn-radius btn-block btn btn-lg btn-primary"
              >
              {openString}
            </a>
          );

          if (this.state.medResources.isFlash) {
            medNotice = (
              <div style={styles.notice}>
                <hr/>
                <p>Para que se ejecute y visualice correctamente,
                  necesitas tener instalada la última versión de
                  <strong>"Adobe Flash Player"</strong> en tu navegador web.
                </p>
              </div>
            );
          }
          break;
        // Video MED type
        case 2:
          medResourceUrl = `/recurso/${this.props.params.med_id}/video`;
          medResourceEmbed = (
            <Link
              target="_blank"
              to={medResourceUrl}
              style={styles.button}
              className="btn-radius btn-block btn btn-lg btn-primary"
              >
              {openString}
            </Link>
          );
          break;
        // Audio & Document MED type
        case 4:
        case 5:
          medResourceUrl = medResource;
          medResourceEmbed = (
            <a
              target="_blank"
              href={medResourceUrl}
              style={styles.button}
              className="btn-radius btn-block btn btn-lg btn-primary"
              >
              {openString}
            </a>
          );
          break;
        default:
          medResourceEmbed = "";
      }
    } else {
      isExternal = true;
      medResourceUrl = referenceUrl;
      medResourceEmbed = (
        <a
          target="_blank"
          href={medResourceUrl}
          style={styles.button}
          className="btn-radius btn-block btn btn-lg btn-primary"
          >
          Abrir el recurso
        </a>
      );
    }

    return (
      <div className="med-detail">
        <Grid>
          {prevButton}
          <Row>
            <Col smOffset={3} sm={6} mdOffset={0} md={3}>
              <Med
                rate
                medType={this.state.medType.id}
                medResourceUrl={medResourceUrl}
                id={this.state.med.id}
                title={this.state.med.title}
                isExternal={isExternal}
                rating={this.state.med.averageScore}
                thumbnail={this.state.med.thumbnailDetail}
                typeclassSlug={this.state.medType.slug}
                />

              <div style={styles.buttonGroup}>
                {medResourceEmbed}
                {medResourceDownload}
                {medNotice}
              </div>
            </Col>

            <Col sm={12} md={9}>
              <Tabs>
                <Tab eventKey={1} title="General">
                  <div className="pull-right">
                    {this.state.loggedIn &&
                      <SocialShare title={this.state.med.title} url={medUrl} postFav={this.postFavorites} isfav={this.state.isFavorite}/>
                    }
                  </div>
                  <Row>
                    <Col sm={12}>
                      <h1>{this.state.med.title}</h1>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} lg={12}>
                      <h4><strong>Descripción</strong></h4>
                      <p style={styles.desc}>{this.state.med.description}</p>
                    </Col>
                  </Row>
                  {Boolean(donorWebsite) && Boolean(donatedBy) && (
                    <a
                      href={donorWebsite}
                      target="_blank"
                      style={styles.donor}
                      >
                      {donatedBy}
                    </a>
                  )}

                  {medKeywords.length &&
                    <Row>
                      <Col xs={12}>
                        <h4><strong>Etiquetas</strong></h4>
                        <hr/>
                        {medKeywords}
                      </Col>
                    </Row>
                  }
                </Tab>
                {this.state.medCurricular.length < 1 ? null : (
                  <Tab eventKey={2} title="Alineación Curricular">
                    <div className="med-curricula">
                      {medCurricular}
                    </div>
                  </Tab>
                  )
                }
              </Tabs>

              <Row>
                <Col xs={12} sm={6} smOffset={3}>
                  {medResourceDownload}
                </Col>
              </Row>

              {this.state.loggedIn &&
                <Row>
                  <Col xs={12}>
                    <MedComments medId={this.props.params.med_id}/>
                  </Col>
                </Row>
              }
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

MedDetails.propTypes = {
  params: React.PropTypes.object.isRequired,
  location: React.PropTypes.object.isRequired
};
