import React, {Component} from 'react';
import {OptionSelect} from './OptionSelect';
import resourcesStore from './SearchAdvancedResources';
// react-bootstrap elements
import {Col} from 'react-bootstrap';

import axios from 'axios';

export class SelectFilter extends Component {
  constructor() {
    super();
    this.state = {
      levels: [],
      grades: [''],
      subjects: [''],
      levelSelectedValue: undefined,
      gradeSelectedValue: undefined,
      subjectSelectedValue: undefined,
      gradesDisabled: true,
      subjectsDisabled: false
    };
    this.levelSelectChange = this.levelSelectChange.bind(this);
    this.gradeSelectChange = this.gradeSelectChange.bind(this);
    this.subjectSelectChange = this.subjectSelectChange.bind(this);
    this._unblockGrades = this._unblockGrades.bind(this);
    this._unblockSubjects = this._unblockSubjects.bind(this);
  }

  componentDidMount() {
    axios
      .get('/levels')
      .then(response => {
        this.setState({levels: response.data.results});
      });
    axios
      .get('/subjects?page_size=50')
      .then(response => {
        this.setState({
          subjects: response.data.results.map(elem => {
            elem.id = elem.slug;
            return elem;
          })
        });
      });
  }

  _unblockGrades(response) {
    if ((response.data.count === 1 && response.data.results[0].name === '-') || response.data.count === 0) {
      this.setState({gradesDisabled: true});
    } else {
      this.setState({gradesDisabled: false});
    }
  }

  _unblockSubjects(response) {
    if ((response.data.count === 1 && response.data.results[0].name === '-') || response.data.count === 0) {
      this.setState({subjectsDisabled: true});
    } else {
      this.setState({subjectsDisabled: false});
    }
  }

  /* Level filter */
  levelSelectChange(option) {
    // Set selected level
    resourcesStore.level = option.value;
    resourcesStore.levelName = option.label;
    this.setState({levelSelectedValue: option.value});

    // Resets grades and subjects dropdowns
    this.refs.gradesReset.resetSelect();
    this.refs.subjectsReset.resetSelect();

    if (option.value === '') {
      // Empty grades
      this.setState({
        grades: [''],
        gradesDisabled: true
      });
    } else {
      // Get grades filtered by level
      axios
        .get(`/levels/${option.value}/grades`)
        .then(response => {
          this.setState({grades: response.data.results});

          this._unblockGrades(response);
        });
    }

    // Get subjects filtered by level
    axios
      .get(`/subjects?level=${option.value}`)
      .then(response => {
        this.setState({
          subjects: response.data.results.map(elem => {
            elem.id = elem.slug;
            return elem;
          })
        });

        this._unblockSubjects(response);
      });
  }

  /* Grade filter */
  gradeSelectChange(option) {
    // Set selected grade
    this.setState({
      gradeSelectedValue: option.value
    });
    resourcesStore.grade = option.value;
    resourcesStore.gradeName = option.label;

    // Reset subject selection
    this.refs.subjectsReset.resetSelect();

    if (option.value !== '') {
      // Get subjects filtered by level and grade
      axios
        .get(`/subjects?level=${this.state.levelSelectedValue}&grade=${option.value}`)
        .then(response => {
          this.setState({
            subjects: response.data.results.map(elem => {
              elem.id = elem.slug;
              return elem;
            })
          });

          this._unblockGrades(response);
        });
    }
  }

  /* Subjects filter */
  subjectSelectChange(option) {
    // Set selected subject
    this.setState({
      subjectSelectedValue: option.value
    });
    resourcesStore.subject = option.value;
    resourcesStore.subjectName = option.label;
  }

  render() {
    return (
      <div>
        <Col lg={4}>
          <OptionSelect
            options={this.state.levels}
            onHandleChange={this.levelSelectChange}
            value={this.state.levelSelectedValue}
            resetLabel="Todos los niveles"
            />
        </Col>

        <Col lg={4}>
          <OptionSelect
            options={this.state.grades}
            disabled={this.state.gradesDisabled}
            onHandleChange={this.gradeSelectChange}
            value={this.state.gradeSelectedValue}
            ref="gradesReset"
            resetLabel="Todos los grados"
            />
        </Col>

        <Col lg={4}>
          <OptionSelect
            disabled={this.state.subjectsDisabled}
            options={this.state.subjects}
            onHandleChange={this.subjectSelectChange}
            value={this.state.gradeSelectedValue}
            ref="subjectsReset"
            resetLabel="Todas las asignaturas"
            />
        </Col>
      </div>
    );
  }
}
