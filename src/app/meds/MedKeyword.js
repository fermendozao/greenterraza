import React, {Component} from 'react';
import {Link} from 'react-router';

export class MedKeyword extends Component {
  render() {
    return (
      <Link
        to={`/s?keyword=${this.props.keyword.slug}`}
        className="med-keyword"
        >
          {this.props.keyword.name}
      </Link>
    );
  }
}

MedKeyword.propTypes = {
  keyword: React.PropTypes.object.isRequired
};
