import React, {Component} from 'react';
// react-bootstrap elements
import {Row, Col, Grid, Button} from 'react-bootstrap';
import {Med} from './med';
import axios from 'axios';

const styles = {
  retryLoad: {
    color: '#adadad',
    cursor: 'pointer',
    fontSize: '40px',
    marginTop: '40px'
  },
  loadMore: {
    margin: '30px 0',
    textAlign: 'center'
  },
  title: {
    margin: '20px 0'
  }
};

export class Meds extends Component {
  constructor() {
    super();
    this.state = {
      meds: [],
      medsCount: 0,
      pageSize: 18,
      pageOffset: 1,
      loadMore: false,
      retryLoad: undefined
    };
    this.handleRetryLoad = this.handleRetryLoad.bind(this);
    this.handleLoadNextPage = this.handleLoadNextPage.bind(this);
  }

  fetchData(page, pageSize, type = '') {
    const url = type === 'fixed' ? '/meds/fixed/front-list' : '/meds';

    axios
      .get(`${url}?page=${page}&page_size=${pageSize}`)
      .then(response => {
        let medsCount, meds, pageOffset;

        // Python is not consistent in the API :-(
        if (type === 'fixed') {
          medsCount = response.data.totalCount;
          meds = response.data.meds;
          // We brought all the fixed meds,
          // we need the number 1 page of all the meds
          pageOffset = 0;
        } else {
          medsCount = response.data.count;
          meds = response.data.results;
          pageOffset = page;
        }

        this.setState({
          meds: this.state.meds.concat(meds),
          medsCount,
          pageOffset,
          retryLoad: false
        });
        if (this.state.medsCount > this.state.meds.length || type === 'fixed') {
          this.setState({loadMore: true});
        } else {
          this.setState({loadMore: false});
        }
      })
      .catch(() => {
        this.setState({
          retryLoad: true,
          loadMore: false
        });
      });
  }

  handleRetryLoad() {
    this.fetchData(this.state.pageOffset, this.state.pageSize);
  }

  componentDidMount() {
    this.fetchData(this.state.pageOffset, this.state.pageSize, 'fixed');
  }

  handleLoadNextPage() {
    const nextPage = this.state.pageOffset + 1;
    this.setState({pageOffset: nextPage});
    this.fetchData(nextPage, this.state.pageSize);
  }

  render() {
    let retryLoad = this.state.retryLoad ? 'text-center' : 'hidden text-center';
    let showMore = this.state.loadMore ? '' : 'hidden';
    let showMoreText = this.state.loadMore ? 'hidden' : '';
    let medsCount = String(this.state.medsCount);
    medsCount = medsCount.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <h3 style={styles.title}>
              ¡Bienvenido! Tenemos
              {' '}
              <strong>{medsCount}</strong>
              {' '}
              recursos disponibles para ti.
            </h3>
          </Col>
        </Row>
        <Row>
          {this.state.meds.map((med, i) => (
            <div key={i} className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
              <Med
                id={med.id}
                title={med.title}
                shortTitle={med.shortTitle}
                rating={med.averageScore}
                thumbnail={med.thumbnail}
                isNew={med.isNew}
                typeclassSlug={med.typeClass.slug}
                />
            </div>
          ))}
        </Row>

        <Row>
          <Col xs={12} className={retryLoad}>
            <a style={styles.retryLoad} onClick={this.handleRetryLoad}>
              <i className="fa fa-refresh fa-5x"></i>
              <h2>Parece que hubo un error al cargar los recursos.</h2>
              <h3>Da click para intentar de nuevo.</h3>
            </a>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={6} smOffset={3} className={showMore}>
            <Button
              bsStyle="primary"
              bsSize="large"
              className="btn-radius"
              block
              style={styles.loadMore}
              onClick={this.handleLoadNextPage}
              >
              Cargar más recursos
            </Button>
          </Col>

          <Col xs={12} className={showMoreText}>
            <h3 style={styles.loadMore}>No hay más recursos para mostrar.</h3>
          </Col>
        </Row>
      </Grid>
    );
  }
}
