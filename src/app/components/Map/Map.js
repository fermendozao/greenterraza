import React, {Component} from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps';

export class GMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 16
    };
  }

  render() {
    const center = {lat: this.props.lat, lng: this.props.lng};

    const MyMapComponent = withScriptjs(withGoogleMap(props =>
      <GoogleMap
        defaultZoom={this.state.zoom}
        defaultCenter={center}
        >
        {props.isMarkerShown && <Marker position={center}/>}
      </GoogleMap>));
    return (
      <div className={`gmap ${this.props.size}`}>
        <div className="gmap__canvas">
          <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js"
            loadingElement={<div style={{height: `100%`}}/>}
            containerElement={<div style={{height: `300px`}}/>}
            mapElement={<div style={{height: `100%`}}/>}
            />
        </div>
      </div>
    );
  }
}

GMap.propTypes = {
  lat: React.PropTypes.number,
  lng: React.PropTypes.number,
  size: React.PropTypes.string
};
