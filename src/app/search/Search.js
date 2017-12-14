import React, {Component} from 'react';
// react-bootstrap elements
import {Row, Grid, Col, Button} from 'react-bootstrap';
import {Med} from '../meds/med';
import axios from 'axios';
import resourcesStore from './searchAdvanced/SearchAdvancedResources';

const styles = {
  notice: {
    padding: '20vh 0',
    color: '#adadad'
  }
};

export class Search extends Component {
  constructor() {
    super();
    this.state = {
      meds: [],
      query: '',
      pageSize: 16,
      pageOffset: 1,
      loadMore: false,
      resultsCount: undefined,
      results: undefined,
      load: true
    };
    this.handleLoadNextPage = this.handleLoadNextPage.bind(this);
  }

  fetchData(data, page, pageSize) {
    const {query} = data;
    let url;
    let params = {
      page,
      page_size: pageSize,
    };

    if (data.pathname === '/recursos-populares') {
      url = '/med-analytics/popular';
    } else {
      url = '/meds/search';
      params = Object.assign(params, {
        q: query.title,
        type: query.type,
        level: query.level,
        grade: query.grade,
        subject: query.subject,
        keywords: query.keyword,
        news: query.news
      })
    }

    this.setState({load: true});
    axios
      .get(url, { params })
      .then(response => {
        if (response.data.count > 0) {
          this.setState({
            meds: this.state.meds.concat(response.data.results),
            resultsCount: response.data.count,
            results: true
          });
          if (this.state.resultsCount > this.state.meds.length) {
            this.setState({loadMore: true});
          } else {
            this.setState({loadMore: false});
          }
        } else {
          this.setState({
            results: false,
            resultsCount: response.data.count
          });
        }
        this.setState({load: false});
      });

    /* Reset stored search values */
    resourcesStore.title = '';
    resourcesStore.types = '';
    resourcesStore.level = '';
    resourcesStore.grade = '';
    resourcesStore.subject = '';
  }

  componentDidMount() {
    const searchQuery = this.props.location;
    this.setState({query: searchQuery});
    this.fetchData(searchQuery, this.state.pageOffset, this.state.pageSize);
  }

  componentWillReceiveProps(nextProps) {
    resourcesStore.show = false;
    const searchQuery = nextProps.location;
    const pageOffset = 1;
    this.setState({
      meds: [],
      pageOffset,
      query: searchQuery,
      resultsCount: undefined
    });
    this.fetchData(nextProps.location, pageOffset, this.state.pageSize);
  }

  handleLoadNextPage() {
    const nextPage = this.state.pageOffset + 1;
    this.setState({pageOffset: nextPage});
    this.fetchData(this.state.query, nextPage, this.state.pageSize);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state;
  }

  render() {
    let display = this.state.load ? 'text-center' : 'hidden text-center';
    let showMore = this.state.loadMore ? '' : 'hidden';
    let showMoreText = this.state.loadMore ? 'hidden' : '';
    let medsCount = String(this.state.resultsCount);
    medsCount = medsCount.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    let content;

    if (this.state.resultsCount > 0) {
      content = (
        <div>
          <Row>
            <Col xs={12}>
              <h3>
                Resultados de tu búsqueda, hay
                {' '}
                <strong>{medsCount}</strong>
                {' '}
                {this.state.resultsCount === 1 ? 'resultado' : 'resultados'}
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
                thumbnail={med.thumbnail}
                typeclassSlug={med.typeClass.slug}
                rating={med.averageScore}
                isNew={med.isNew}
                prevPath={this.props.location.pathname}
                />
            </div>
          ))}
          </Row>

          <Row>
            <Col xs={12} sm={6} smOffset={3} className={showMore}>
              <Button
                bsStyle="info"
                bsSize="large"
                className="btn-radius"
                block
                style={styles.loadMore}
                onClick={this.handleLoadNextPage}
                >
                CARGAR MÁS RESULTADOS
              </Button>
            </Col>

            <Col xs={12} className={showMoreText}>
              <h3 className="text-center">
                Has llegado al final de la búsqueda. <br/>
                No hay más resultados para mostrar.
              </h3>
            </Col>
          </Row>
        </div>
      );
    } else if (this.state.resultsCount === 0 && this.state.query.query.level === "2") {
      content = (
        <div className="text-center" style={styles.notice}>
          <h1>Próximamente</h1>
        </div>
      );
    } else if (this.state.resultsCount === 0) {
      content = (
        <div className="text-center" style={styles.notice}>
          <h1>No encontramos resultados para tu búsqueda :(</h1>
          <h2>Por favor intenta con otro término o usa nuestra búsqueda avanzada.</h2>
        </div>
      );
    } else {
      content = "";
    }

    return (
      <div className="main-content">
        <Grid>
          {content}
          <div className={display}>
            <i className="fa fa-cog fa-spin fa-5x"></i>
            <h2>Espera un momento, estamos buscando los recursos.</h2>
          </div>
        </Grid>
      </div>
    );
  }
}

Search.propTypes = {
  location: React.PropTypes.object.isRequired
};
