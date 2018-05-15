import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';

export class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({open: false});
  }

  handleOpen() {
    this.setState({open: true});
  }

  render() {
    const {title, description, image, modal} = this.props;
    return (
      <div className="gallery-element" onClick={this.handleOpen}>
        <img className="image" src={image}/>
        {!modal &&
          <div className="description">
            <h3 className="title">{title}</h3>
            <span className="description">{description}</span>
            <ul className="fa-ul">
              <li><a href="#"><i className="fa fa-facebook"/></a></li>
              <li><a href="#"><i className="fa fa-twitter"/></a></li>
              <li><a href="#"><i className="fa fa-info"/></a></li>
            </ul>
          </div>
        }
        <Modal show={this.state.open && modal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
            <Modal.Body><img className="image" src={image}/></Modal.Body>
          </Modal.Header>
        </Modal>
      </div>
    );
  }
}

Card.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  image: React.PropTypes.string,
  modal: React.PropTypes.bool
};
