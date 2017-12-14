import React, {Component} from 'react';

import axios from 'axios';
import Formsy from 'formsy-react';
import {Textarea} from 'formsy-react-components';
import {FormGroup, Button} from 'react-bootstrap';

export class MedComments extends Component {
  constructor() {
    super();
    this.state = {
      comments: [],
      canSubmit: false,
      sendError: '',
      submittedComment: '',
      submittedCommentAuthor: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEnableButton = this.handleEnableButton.bind(this);
    this.handleDisableButton = this.handleDisableButton.bind(this);
  }

  handleSubmit(data) {
    axios
      .post(`/meds/${this.props.medId}/comments`, data)
      .then(response => {
        this.setState({
          submittedComment: data.text,
          submittedCommentAuthor: response.data.author
        });
        this.resetForm();
      })
      .catch(error => {
        console.log(error);
        this.setState({
          sendError: 'Parece que hubo un problema al enviar tu comentario. Por favor intenta de nuevo más tarde.'
        });
      });
  }

  resetForm() {
    this.refs.commentForm.reset();
  }

  handleEnableButton() {
    this.setState({
      canSubmit: true
    });
  }

  handleDisableButton() {
    this.setState({
      canSubmit: false
    });
  }

  fetchData(medId) {
    axios
      .get(`/meds/${medId}/comments`)
      .then(response => {
        this.setState({comments: response.data.results});
      })
      .catch(error => {
        console.log(`Request failed: ${error}`);
      });
  }

  componentDidMount() {
    const medId = this.props.medId;
    if (medId && medId !== undefined || medId !== "undefined") {
      this.fetchData(medId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const medId = nextProps.medId;
    if (medId && medId !== undefined || medId !== "undefined") {
      this.fetchData(medId);
    }
  }

  render() {
    const comments = this.state.comments;
    return (
      <div>
        <div className="med-comments--stream">
          <p><strong>Comentarios</strong></p>

          {this.state.submittedComment &&
            <div className="med-comments--submitted med-comments--entity">
              {this.state.submittedCommentAuthor}
              <p>Tu comentario está en revisión. ¡Gracias!</p>
              <p>{this.state.submittedComment}</p>
            </div>
          }

          {comments.map((comment, i) => (
            <div key={i} className="med-comments--entity">
              {comment.author}
              <p>{comment.text}</p>
            </div>
          ))}
        </div>

        <Formsy.Form
          ref="commentForm"
          className="med-comments--form"
          onSubmit={this.handleSubmit}
          onValid={this.handleEnableButton}
          onInvalid={this.handleDisableButton}
          >
          <p><strong>Dejar un comentario</strong></p>

          <Textarea
            layout="vertical"
            name="text"
            rows={5}
            cols={40}
            required
            defaultValue=""
            value=""
            placeholder="Escribe tu mensaje"
            validations={{maxLength: 1000}}
            validationErrors={{
              maxLength: 'El máximo de caracteres permitidos es 1,000.'
            }}
            />

          <p className="text-danger">
            {this.state.sendError}
          </p>

          <FormGroup>
            <Button
              type="submit"
              bsStyle="primary"
              className="btn-radius pull-right"
              disabled={!this.state.canSubmit}
              >
              Enviar
            </Button>
          </FormGroup>
        </Formsy.Form>
      </div>
    );
  }
}

MedComments.propTypes = {
  medId: React.PropTypes.string.isRequired
};
