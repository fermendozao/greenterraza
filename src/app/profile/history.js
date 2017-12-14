import React, {Component} from 'react';
// react-bootstrap elements
import {Row, Col, Button} from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';

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
    margin: '20px 0',
    fontWeight: "bold"
  }
};

export class History extends Component {
  constructor() {
    super();
    this.state = {
      consultations: [],
      historyCount: 0,
      pageSize: 13,
      pageOffset: 1,
      loadMore: false,
      retryLoad: undefined
    };
    this.handleRetryLoad = this.handleRetryLoad.bind(this);
    this.handleLoadNextPage = this.handleLoadNextPage.bind(this);
  }

  fetchData(page, pageSize) {
    const url = `/me/history?page=${page}&page_size=${pageSize}`;

    axios
      .get(`${url}`)
      .then(response => {
        const historyCount = response.data.count;
        const consultations = response.data.results;
        const pageOffset = page;

        this.setState({
          consultations: this.state.consultations.concat(consultations),
          historyCount,
          pageOffset,
          retryLoad: false
        });

        if (this.state.historyCount > this.state.consultations.length) {
          this.setState({loadMore: true});
        } else {
          this.setState({loadMore: false});
        }
      })
      .catch(() => {
        console.log('error');
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
    this.fetchData(this.state.pageOffset, this.state.pageSize);
  }

  componentWillReceiveprops(nextProps) {
    this.fetchData(nextProps.pageOffset, nextProps.pageSize);
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

    return (
      <div>
        <Row>
          <Col xs={12}>
            <h5 style={styles.title}>
              Historial de consulta y consumo
            </h5>
          </Col>
        </Row>
        {this.state.consultations.length > 0 &&
          this.state.consultations.map((med, i) => (
            <Row key={i} className="historyElemnt">
              <Col xs={6} className="-name">
                {med.target.replace('(Recurso Digital)', '')}
              </Col>
              <Col xs={4} className="-date">
                {moment(med.timestamp).utc().format('LL')}
              </Col>
              <Col xs={2} className="verb">
                {med.verb}
              </Col>
            </Row>
          ))
        }
        <Row>
          <Col xs={12} className={retryLoad}>
            <a style={styles.retryLoad} onClick={this.handleRetryLoad}>
              <i className="fa fa-refresh fa-5x"></i>
              <h2>Parece que hubo un error al cargar tu historial.</h2>
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
              Cargar más
            </Button>
          </Col>

          <Col xs={12} className={showMoreText}>
            <h3 style={styles.loadMore}>No hay más información para mostrar.</h3>
          </Col>
        </Row>
      </div>
    );
  }
}
