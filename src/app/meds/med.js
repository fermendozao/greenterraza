import React, {Component} from 'react';
import {Link} from 'react-router';

import axios from 'axios';

const styles = {
  rateMsg: {
    position: 'absolute',
    width: '100%',
    left: '0',
    bottom: '0',
    padding: '17px',
    background: 'rgba(0,0,0,.7)',
    color: 'white',
    textAlign: 'center',
    transition: 'all 3s ease'
  }
};

export class Med extends Component {
  constructor() {
    super();
    this.state = {
      rating: 3,
      rated: false,
      rate: true,
      isNew: false
    };
    this.handleStarClick = this.handleStarClick.bind(this);
    this.onRenderStarIcon = this.onRenderStarIcon.bind(this);
    this.onRenderStarIconHalf = this.onRenderStarIconHalf.bind(this);
  }

  handleStarClick(nextValue) {
    axios.post('/meds/score', {
      med: this.props.id,
      value: nextValue
    })
    .then(() => {
      this.setState({
        rating: nextValue,
        rated: true,
        rate: false
      });
    })
    .catch(error => {
      console.log(`Error sending data ${error}`);
    });
  }

  onRenderStarIcon(index, value) {
    return <span className={index <= value ? 'fa fa-star fa-size' : 'fa fa-star-o fa-size'}/>;
  }

  onRenderStarIconHalf() {
    return <span className="fa fa-star-half-full fa-size"></span>;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      rating: nextProps.rating,
      rate: nextProps.rate
    });
  }

  componentDidMount() {
    this.setState({
      rating: this.props.rating,
      rate: this.props.rate
    });
  }

  render() {
    let medIcon = `med-icon med-icon--${this.props.typeclassSlug}`;
    let rateEdit = this.state.rate ? 'false' : '';
    const isNew = this.props.isNew ? 'new-ribbon' : '';

    let rateMsg;
    if (this.state.rated) {
      rateMsg = (
        <div style={styles.rateMsg}>
          <h5>¡Gracias por tu voto!</h5>
        </div>
      );
    }

    let medLink;
    const {id, medType, medResourceUrl, shortTitle, title, thumbnail, isExternal} = this.props;
    const betterTitle = shortTitle ? shortTitle : title;

    /*
     * Build the content used by the next element
     */
    const medLinkContent = (
      <div>
        <div className={`med-img ${isNew}`}>
          <img src={thumbnail} alt={`Imagen del recurso: ${id}`}/>
        </div>
        <span className="med-type">
          <span className={medIcon}></span>
        </span> {' '}
        <h2 className="med-title">
          {betterTitle}
        </h2>
      </div>
    );

    /*
     * If Med type is not defined, route should be to medDetails component
     * If Med type is video, route should be to medVideo component
     * If Med type is anything but video, we shall show an anchor instead of
     * Link component, to the external resource
     */
    if (!medType) {
      medLink = (
        <Link to={`/recurso/${id}`} query={{prevPath: this.props.prevPath}}>
          {medLinkContent}
        </Link>
      );
    } else if (medType === 2 && !isExternal) {
      // Med type is video
      medLink = (
        <Link to={`/recurso/${id}/video`} target="_blank" query={{prevPath: this.props.prevPath}}>
          {medLinkContent}
        </Link>
      );
    } else {
      // Med type is anything but video
      medLink = (
        <a href={medResourceUrl} target="_blank">
          {medLinkContent}
        </a>
      );
    }

    return (
      <div className="med">
        {medLink}
        {rateMsg}
        {this.props.children}
      </div>
    );
  }
}

Med.propTypes = {
  id: React.PropTypes.number.isRequired,
  isNew: React.PropTypes.boolean,
  medType: React.PropTypes.number,
  medResourceUrl: React.PropTypes.string,
  prevPath: React.PropTypes.string,
  rate: React.PropTypes.boolean,
  shortTitle: React.PropTypes.string,
  title: React.PropTypes.string.isRequired,
  rating: React.PropTypes.isRequired,
  thumbnail: React.PropTypes.string.isRequired,
  typeclassSlug: React.PropTypes.string.isRequired,
  isExternal: React.PropTypes.boolean,
  children: React.PropTypes.object
};
