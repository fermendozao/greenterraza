import React, {Component} from 'react';

export class OptionSelect extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.resetSelect = this.resetSelect.bind(this);
  }

  handleChange(selected) {
    this.setState({selectedValue: selected});
    this.props.onHandleChange(selected);
  }

  resetSelect() {
    this.refs.lastselect.handleResetSelect();
  }

  render() {
    let options = this.props.options.map(option => (
      <option key={option.id} dataValue={option.id}>
        {option.name}
      </option>
    ));

    let disabled = this.props.disabled ? 'pointer-disabled' : '';

    if (this.props.defaultValue === undefined) {
      return (
        <div className={disabled}>

        </div>
      );
    }
    return (
      <div className={disabled}>

      </div>
    );
  }
}

OptionSelect.propTypes = {
  disabled: React.PropTypes.bool,
  options: React.PropTypes.array.isRequired,
  onHandleChange: React.PropTypes.func.isRequired,
  resetLabel: React.PropTypes.string,
  defaultValue: React.PropTypes.string
};
