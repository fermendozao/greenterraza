import React, {Component} from 'react';
import {Med} from './med';
import {Row, Col} from 'react-bootstrap';

export class MedGroup extends Component {

  render() {
    const medGroupName = this.props.meds[0].typeClass.name;
    const medGroupSlug = this.props.meds[0].typeClass.slug;
    const medIcon = `med-icon med-icon--${medGroupSlug}_transparent`;

    return (
      <div className="med-group">
        <Row>
          <Col xs={12}>
            <div className="med-group--title">
              <span className={medIcon}></span>
              <span className="med-icon--txt">
                {medGroupName}
              </span>
            </div>
          </Col>
        </Row>

        <Row>
          {this.props.meds.map((med, i) => (
            <Med key={i} med={med}/>
          ))}
        </Row>
      </div>
    );
  }
}

MedGroup.propTypes = {
  meds: React.PropTypes.array.isRequired
};
