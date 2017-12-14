import React, {Component} from 'react';

import axios from 'axios';
const {log} = console;

export class MedVideo extends Component {
  constructor() {
    super();
    this.state = {
      medVideo: ''
    };
  }

  fetchData(medId) {
    axios
      .get(`/meds/${medId}/resources`)
      .then(response => {
        this.setState({
          medVideo: response.data.results[0].attachedFile
        });
      });
  }

  componentDidMount() {
    const medId = this.props.params.med_id;
    if (medId && medId !== undefined || medId !== "undefined") {
      this.fetchData(medId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const medId = nextProps.params.med_id;
    if (medId && medId !== undefined || medId !== "undefined") {
      this.fetchData(medId);
    }
  }

  render() {
    return (
      <div className="text-center">
        <video controls src={this.state.medVideo} autoPlay>
          <p>Lo sentimos, tu navegador no soporta la reproducción de este video.
            Puedes descargarlo <a href={this.state.medVideo}>aquí</a> y reproducirlo
            en tu programa favorito.
          </p>
        </video>
      </div>
    );
  }
}
