import React, {Component} from 'react';
import resourcesStore from './searchAdvanced/SearchAdvancedResources';

const styles = {
  breadcrumbSearch: {
    lineHeight: '30px'
  }
}

export class SearchBreadcrumb extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillReceiveProps(nextProps, state) {
    const { titleName: title, levelName: level, gradeName: grade, subjectName: subject, typesNames: types } = resourcesStore;
    this.setState({
      title,
      level,
      grade,
      subject,
      types
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { title, level, grade, subject, types } = nextState;
    if (
      title === undefined &&
      level === undefined &&
      grade === undefined &&
      subject === undefined &&
      types === undefined
    ) {
      return false
    } else {
      return true
    }
  }

  render() {
    const re = /^#\/s\?/;
    let show = re.test(document.location.hash);

    let title = this.state.title ? ` "${this.state.title}" en` : '';
    let level = this.state.level ? this.state.level : 'Todos';
    let grade = this.state.grade ? this.state.grade : 'Todos';
    let subject = this.state.subject ? this.state.subject : 'Todas';
    let types = this.state.types ? this.state.types : 'Todos';

    let search = show &&
      (!!title || !!level || !!grade || !!subject || !!types)
      ? true : false;

    let message = search ?
      `> Tu búsqueda fue:${title} Nivel: ${level}, Grado: ${grade}, Asignatura: ${subject} para recursos tipo ${types}.` : '';

    return (
      <div className="breadcrumbs" style={styles.breadcrumbSearch}>{message}</div>
    );
  }
}
