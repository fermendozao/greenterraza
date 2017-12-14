import React, {Component} from 'react';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';

export class SocialShare extends Component {
  render() {
    let favIcon;
    const shareUrl = this.props.url;
    const title = this.props.title;
    const tooltip = (
      <Tooltip id="tooltip" className="fav-tooltip"><strong>Agregar a tus favoritos</strong></Tooltip>
    );
    const funcPost = this.props.postFav;
    if (this.props.isfav) {
      favIcon = (
        <div className="med-fav--icon"></div>
      );
    } else {
      favIcon = (
        <OverlayTrigger placement="top" overlay={tooltip}>
          <div className="med-fav--icon not-fav" onClick={funcPost}></div>
        </OverlayTrigger>
      );
    }
    return (
      <div className="med-social_share">
        {favIcon}
        <div className="med-social_share--icon">

        </div>

        <div className="med-social_share--icon">

        </div>

        <div className="med-social_share--icon">

        </div>
      </div>
    );
  }
}

SocialShare.propTypes = {
  title: React.PropTypes.string,
  url: React.PropTypes.string,
  postFav: React.PropTypes.func,
  isfav: React.PropTypes.bool
};
